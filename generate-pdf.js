const puppeteer = require('puppeteer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const PAGE_W = 1440;
const PAGE_H = 810;

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  // Use a very tall viewport so ALL slides are rendered without scrolling
  await page.setViewport({ width: PAGE_W, height: PAGE_H * 20, deviceScaleFactor: 2 });

  const filePath = 'file://' + path.resolve(__dirname, 'workshop.html');
  await page.goto(filePath, { waitUntil: 'networkidle0', timeout: 30000 });

  // Hide slide labels and margins for clean screenshots
  await page.addStyleTag({ content: `
    .slide-label { display: none !important; }
    .nav-arrow, .slide-nav { display: none !important; }
    body { padding: 0; margin: 0; }
    .slide-wrapper { margin: 0; padding: 0; }
  `});

  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 3000));

  // Get absolute positions of all slides
  const slides = await page.evaluate(() => {
    const results = [];
    document.querySelectorAll('.slide').forEach((slide, i) => {
      const rect = slide.getBoundingClientRect();
      results.push({
        index: i,
        x: rect.x + window.scrollX,
        y: rect.y + window.scrollY,
        width: rect.width,
        height: rect.height,
      });
    });
    return results;
  });

  console.log(`Found ${slides.length} slides`);

  const doc = new PDFDocument({
    size: [PAGE_W, PAGE_H],
    margin: 0,
    autoFirstPage: false,
  });
  const outputPath = path.resolve(__dirname, 'VVV-Deck.pdf');
  doc.pipe(fs.createWriteStream(outputPath));

  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    console.log(`Processing slide ${i + 1}/${slides.length}... (y: ${slide.y})`);

    // 1. Screenshot using absolute page coordinates
    const screenshotBuffer = await page.screenshot({
      type: 'jpeg',
      quality: 95,
      clip: { x: slide.x, y: slide.y, width: PAGE_W, height: PAGE_H },
      fullPage: false,
    });
    const screenshotPath = path.resolve(__dirname, `_slide_${i}.jpg`);
    fs.writeFileSync(screenshotPath, screenshotBuffer);

    // 2. Extract text positions relative to this slide
    const textItems = await page.evaluate((idx) => {
      const slideEl = document.querySelectorAll('.slide')[idx];
      const slideRect = slideEl.getBoundingClientRect();
      const items = [];
      const seen = new Set();
      const walker = document.createTreeWalker(slideEl, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) => {
          if (!node.textContent.trim()) return NodeFilter.FILTER_REJECT;
          const s = window.getComputedStyle(node.parentElement);
          if (s.display === 'none' || s.visibility === 'hidden' || s.opacity === '0')
            return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        },
      });
      while (walker.nextNode()) {
        const tn = walker.currentNode;
        const text = tn.textContent.trim();
        const range = document.createRange();
        range.selectNodeContents(tn);
        const rects = range.getClientRects();
        for (const rect of rects) {
          const x = rect.left - slideRect.left;
          const y = rect.top - slideRect.top;
          if (rect.width < 1 || rect.height < 1) continue;
          if (x < -10 || y < -10 || x > 1450 || y > 820) continue;
          const key = `${Math.round(x)},${Math.round(y)},${text.substring(0, 20)}`;
          if (seen.has(key)) continue;
          seen.add(key);
          items.push({
            text,
            x: Math.max(0, x),
            y: Math.max(0, y),
            width: rect.width,
            height: rect.height,
            fontSize: parseFloat(window.getComputedStyle(tn.parentElement).fontSize),
          });
        }
      }
      return items;
    }, i);

    // 3. Build PDF page
    doc.addPage({ size: [PAGE_W, PAGE_H], margin: 0 });

    // Background: the pixel-perfect screenshot
    doc.image(screenshotPath, 0, 0, { width: PAGE_W, height: PAGE_H });

    // 4. Invisible searchable text overlay
    doc.save();
    doc.addContent('3 Tr'); // Text rendering mode 3 = invisible

    for (const item of textItems) {
      if (!item.text || item.fontSize < 1) continue;
      const pdfFontSize = Math.max(item.fontSize * 0.75, 4);
      doc.fontSize(pdfFontSize);
      doc.text(item.text, item.x, item.y, {
        width: item.width + 50,
        lineBreak: false,
        continued: false,
      });
    }

    doc.addContent('0 Tr'); // Reset rendering mode
    doc.restore();

    fs.unlinkSync(screenshotPath);
    console.log(`  -> ${textItems.length} text items overlaid`);
  }

  doc.end();
  await new Promise(resolve => doc.on('end', resolve));

  const fileSize = fs.statSync(outputPath).size;
  console.log(`PDF generated: VVV-Deck.pdf (${(fileSize / 1024 / 1024).toFixed(1)}MB)`);
  await browser.close();
})();
