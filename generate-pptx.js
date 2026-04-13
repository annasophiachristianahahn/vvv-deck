const PptxGenJS = require('pptxgenjs');
const fs = require('fs');
const path = require('path');

const pptx = new PptxGenJS();
pptx.defineLayout({ name: 'CUSTOM', width: 15, height: 8.4375 }); // 1440/96=15", 810/96=8.4375"
pptx.layout = 'CUSTOM';

// Colors
const BG = 'ADD8E8';
const DARK = '1A2836';
const MID = '3A4F5E';
const ROSE = 'C4289A';
const CRIMSON = 'C92D35';
const CHARTREUSE = '6A9A1A';
const SAFFRON = 'C99A2D';
const VIOLET = '7A2DC9';
const TANGERINE = 'D06A20';

function addFooter(slide, pageNum) {
  slide.addText('vvv.so', { x: 0.6, y: 7.8, w: 2, h: 0.4, fontSize: 10, color: MID, fontFace: 'Helvetica' });
  slide.addText(`${pageNum}/14`, { x: 13, y: 7.8, w: 1.5, h: 0.4, fontSize: 10, color: MID, fontFace: 'Helvetica', align: 'right' });
}

// ═══════════════════════════════════════════════════
// SLIDE 1 — INTRO
// ═══════════════════════════════════════════════════
let slide = pptx.addSlide();
slide.background = { color: BG };
try { slide.addImage({ path: path.resolve('backgrounds/intro copy-shadow.png'), x: 1.5, y: 1.5, w: 12, h: 5.5 }); } catch(e) {}
slide.addText(
  'An $83 trillion wealth transfer is reshaping art collecting for digital-native generations, yet every existing platform treats art like a trading terminal. VVV.SO is the only platform built around what actually drives lasting value in this market: culture, identity, and community.',
  { x: 2.5, y: 0.3, w: 10, h: 1.2, fontSize: 16, color: VIOLET, fontFace: 'Georgia', align: 'center', italic: true }
);
slide.addText('(UBS Global Wealth Report, Art Basel & UBS Survey 2025)', { x: 2.5, y: 1.3, w: 10, h: 0.3, fontSize: 10, color: VIOLET, fontFace: 'Georgia', align: 'center', italic: true, transparency: 50 });
slide.addText(
  "We're not only building a better marketplace —\nwe're building the cultural infrastructure that turns\ncollectors into fanatics and artists into movements.",
  { x: 2.5, y: 6.5, w: 10, h: 1.2, fontSize: 18, color: VIOLET, fontFace: 'Georgia', align: 'center', italic: true }
);
addFooter(slide, 1);

// ═══════════════════════════════════════════════════
// SLIDE 2 — TRACTION
// ═══════════════════════════════════════════════════
slide = pptx.addSlide();
slide.background = { color: BG };
slide.addText('01', { x: 6.8, y: 0.2, w: 1, h: 0.3, fontSize: 11, color: CRIMSON, fontFace: 'Helvetica', bold: true });
slide.addText('TRACTION', { x: 1, y: 0.3, w: 13, h: 1.2, fontSize: 72, color: TANGERINE, fontFace: 'Georgia', align: 'center', bold: true });
slide.addText("Fully organic growth since launch in May 2025 —\nno paid marketing, no incentives, no wash trading.", { x: 2, y: 1.5, w: 11, h: 0.8, fontSize: 18, color: DARK, fontFace: 'Georgia', align: 'center', italic: true });

const stats = [
  { val: '3,855 SOL', label: 'TOTAL PRIMARY\nSALES VOLUME', color: CRIMSON, x: 2 },
  { val: '641', label: 'LAUNCHED\nCOLLECTIONS', color: SAFFRON, x: 5.5 },
  { val: '301', label: 'UNIQUE\nCREATORS', color: ROSE, x: 9 },
  { val: '5,472', label: 'UNIQUE\nCOLLECTORS', color: CHARTREUSE, x: 2 },
  { val: '3,929', label: 'REPEAT\nCOLLECTORS', color: VIOLET, x: 5.5 },
  { val: '67,528', label: 'NFTS\nMINTED', color: TANGERINE, x: 9 },
];
stats.forEach((s, i) => {
  const y = i < 3 ? 2.8 : 4.2;
  slide.addText(s.val, { x: s.x, y: y, w: 3.5, h: 0.7, fontSize: 36, color: s.color, fontFace: 'Georgia', align: 'center', bold: true });
  slide.addText(s.label, { x: s.x, y: y + 0.7, w: 3.5, h: 0.6, fontSize: 12, color: DARK, fontFace: 'Helvetica', align: 'center', bold: true });
});
addFooter(slide, 2);

// ═══════════════════════════════════════════════════
// SLIDE 3 — PROBLEM
// ═══════════════════════════════════════════════════
slide = pptx.addSlide();
slide.background = { color: BG };
try { slide.addImage({ path: path.resolve('backgrounds/monkeys/shadow/problem-shadow.png'), x: 8.5, y: 0.5, w: 6, h: 7.5 }); } catch(e) {}
slide.addText('02', { x: 0.6, y: 0.4, w: 1, h: 0.3, fontSize: 11, color: CRIMSON, fontFace: 'Helvetica', bold: true });
slide.addText('PROBLEM', { x: 0.6, y: 0.6, w: 8, h: 1.2, fontSize: 72, color: CRIMSON, fontFace: 'Georgia', bold: true });
slide.addText("The basics of a seamless experience for\nartists and collectors still aren't solved.", { x: 0.6, y: 1.7, w: 7.5, h: 0.8, fontSize: 22, color: DARK, fontFace: 'Georgia', italic: true });

const problems = [
  { num: '01', title: 'Viewing is broken', body: 'Collectors have nowhere to showcase their collection, killing the social proof loop that drives repeat collectorship.', color: CRIMSON },
  { num: '02', title: 'No platform feels fun', body: "Nothing captures the instinctive trading energy people had with Pokémon cards, where experience matters more than the material.", color: VIOLET },
  { num: '03', title: 'Artists VS. Collectors', body: "Instead of a symbiotic ecosystem, they're treated as separate groups — stifling the cultural and economic value they build together.", color: CHARTREUSE },
  { num: '04', title: 'History is frozen in 2021', body: "Autoglyphs, Fidenza, CryptoPunks — trapped in a time capsule, grouped with PFP projects, disconnected from artists pushing the space forward. No platform bridges that history with what's happening now.", color: TANGERINE },
];
problems.forEach((p, i) => {
  const y = 2.8 + i * 1.2;
  slide.addText(p.num, { x: 0.6, y: y, w: 0.5, h: 0.25, fontSize: 9, color: DARK, fontFace: 'Helvetica', bold: true });
  slide.addText(p.title.toUpperCase(), { x: 0.6, y: y + 0.2, w: 7, h: 0.35, fontSize: 20, color: p.color, fontFace: 'Georgia', bold: true });
  slide.addText(p.body, { x: 0.6, y: y + 0.55, w: 7, h: 0.55, fontSize: 13, color: DARK, fontFace: 'Helvetica' });
});

slide.addText("Until these basics are solved, market growth is capped\nby what the tech can reach — not what the culture can sustain.", { x: 0.6, y: 7.2, w: 7, h: 0.5, fontSize: 14, color: ROSE, fontFace: 'Georgia', italic: true });
addFooter(slide, 3);

// ═══════════════════════════════════════════════════
// SLIDE 4 — SOLUTION
// ═══════════════════════════════════════════════════
slide = pptx.addSlide();
slide.background = { color: BG };
try { slide.addImage({ path: path.resolve('backgrounds/monkeys/shadow/monkey2 copy.png'), x: 0.5, y: 0.5, w: 6.5, h: 7.5 }); } catch(e) {}
slide.addText('03', { x: 13.5, y: 0.3, w: 1, h: 0.3, fontSize: 11, color: CRIMSON, fontFace: 'Helvetica', bold: true, align: 'right' });
slide.addText('SOLUTION', { x: 7, y: 0.3, w: 7.5, h: 1.2, fontSize: 72, color: CHARTREUSE, fontFace: 'Georgia', bold: true, align: 'right' });
slide.addText("A cultural platform where artists\nand collectors grow together.", { x: 7, y: 1.4, w: 7.5, h: 0.7, fontSize: 20, color: DARK, fontFace: 'Georgia', italic: true, align: 'right' });

const solutions = [
  { num: '01', title: 'Gallery + Social Layer + Market', body: 'Built for cultural growth, not just trading.', color: CRIMSON },
  { num: '02', title: 'Side by side, not siloed', body: 'Artists and collectors grow together — not divided into creator vs. trader roles.', color: VIOLET },
  { num: '03', title: 'Viewing finally works', body: 'Sharing and showcasing NFTs feels natural — the basic experience every other platform still gets wrong.', color: CHARTREUSE },
  { num: '04', title: 'Culture actually happens here', body: 'A living ecosystem — not a static gallery, not a trading floor, but somewhere culture breathes.', color: TANGERINE },
  { num: '05', title: 'Cross-chain', body: "Connecting Ethereum's art-historical legacy with Solana's energy and experimentation. One place to grow, regardless of chain.", color: SAFFRON },
];
solutions.forEach((s, i) => {
  const y = 2.4 + i * 1.1;
  slide.addText(s.num, { x: 13.5, y: y, w: 1, h: 0.25, fontSize: 9, color: DARK, fontFace: 'Helvetica', bold: true, align: 'right' });
  slide.addText(s.title.toUpperCase(), { x: 7, y: y + 0.15, w: 7.5, h: 0.35, fontSize: 20, color: s.color, fontFace: 'Georgia', bold: true, align: 'right' });
  slide.addText(s.body, { x: 7, y: y + 0.5, w: 7.5, h: 0.5, fontSize: 13, color: DARK, fontFace: 'Helvetica', align: 'right' });
});
addFooter(slide, 4);

// ═══════════════════════════════════════════════════
// SLIDE 5 — INTERFACE
// ═══════════════════════════════════════════════════
slide = pptx.addSlide();
slide.background = { color: BG };
slide.addText('04', { x: 6.5, y: 0.2, w: 1, h: 0.3, fontSize: 11, color: CRIMSON, fontFace: 'Helvetica', bold: true, align: 'center' });
slide.addText('VVV.SO Interface', { x: 2, y: 0.3, w: 11, h: 0.6, fontSize: 28, color: ROSE, fontFace: 'Georgia', italic: true, align: 'center' });

const interfaces = [
  { title: 'Discovery Grid', img: 'interface/discovery.png', num: '01' },
  { title: 'Mint Pages', img: 'interface/mint-page.png', num: '02' },
  { title: 'User Profiles', img: 'interface/profile.png', num: '03' },
  { title: 'User Galleries', img: 'interface/gallery.png', num: '04' },
];
interfaces.forEach((iface, i) => {
  const x = 0.5 + i * 3.6;
  try { slide.addImage({ path: path.resolve(iface.img), x: x, y: 1.2, w: 3.3, h: 3.3 }); } catch(e) {}
  slide.addText(iface.num, { x: x, y: 4.6, w: 3.3, h: 0.25, fontSize: 9, color: DARK, fontFace: 'Helvetica', bold: true });
  slide.addText(iface.title.toUpperCase(), { x: x, y: 4.8, w: 3.3, h: 0.35, fontSize: 16, color: CRIMSON, fontFace: 'Georgia', bold: true });
});
addFooter(slide, 5);

// ═══════════════════════════════════════════════════
// SLIDE 6 — THE VVVIRAL LOOP
// ═══════════════════════════════════════════════════
slide = pptx.addSlide();
slide.background = { color: BG };
slide.addText('05', { x: 6.8, y: 0.1, w: 1, h: 0.3, fontSize: 11, color: CRIMSON, fontFace: 'Helvetica', bold: true });
slide.addText('THE VVVIRAL LOOP', { x: 1, y: 0.2, w: 13, h: 0.8, fontSize: 48, color: ROSE, fontFace: 'Georgia', bold: true, align: 'center', transparency: 70 });

const loopSteps = [
  { title: 'Artists launch new\nwork on VVV', body: 'Collectors get\nprimary market access.', color: CRIMSON, x: 5, y: 1.2 },
  { title: 'Collectors mint and\nimmediately display pieces', body: 'Profiles, galleries, and activity feeds\nturn every mint into a visible cultural signal.', color: VIOLET, x: 10, y: 1.8 },
  { title: 'Discovery spreads\nthrough the network', body: 'Following, notifications, and social\nfeeds pull in friends and aligned collectors.', color: CHARTREUSE, x: 10, y: 4.2 },
  { title: 'Secondary market\nactivates', body: 'Profile-based buying, social signals,\nand P2P escrow deals create a natural\nFOMO loop that strengthens demand\nand visibility.', color: SAFFRON, x: 5, y: 5.8 },
  { title: 'Reputation builds\nthe culture', body: 'Proof-of-Tastemaker highlights who\nfinds great work early, reinforcing\nidentity and taste.', color: TANGERINE, x: 0.5, y: 4.2 },
  { title: 'Artists expand into\nnew formats', body: 'Merch, physical redemptions, books,\nand additional releases give collectors\nmore ways to engage and deepen their\nrelationship with the artist.', color: ROSE, x: 0.5, y: 1.8 },
];
loopSteps.forEach(s => {
  slide.addText(s.title.toUpperCase(), { x: s.x, y: s.y, w: 4.5, h: 0.55, fontSize: 14, color: s.color, fontFace: 'Georgia', bold: true, align: 'center' });
  slide.addText(s.body, { x: s.x, y: s.y + 0.55, w: 4.5, h: 0.8, fontSize: 11, color: DARK, fontFace: 'Helvetica', align: 'center' });
});
addFooter(slide, 6);

// ═══════════════════════════════════════════════════
// SLIDE 7 — PRODUCT OVERVIEW
// ═══════════════════════════════════════════════════
slide = pptx.addSlide();
slide.background = { color: BG };
slide.addText('06', { x: 6.8, y: 0.2, w: 1, h: 0.3, fontSize: 11, color: CRIMSON, fontFace: 'Helvetica', bold: true });
slide.addText('PRODUCT', { x: 1, y: 0.2, w: 13, h: 1.5, fontSize: 96, color: CRIMSON, fontFace: 'Georgia', bold: true, align: 'center', transparency: 70 });

const layers = [
  {
    label: 'LAYER 1 — LIVE', title: 'MINTING + LAUNCHPAD', color: CRIMSON, x: 0.5,
    items: ['NFT minting\nFully functional platform, live today.', '$600K+ volume\nTotal trading in 2025.', '2.2% platform fee\nCharged on all primary sales.', 'Product-market fit\nProven with creators and collectors.', 'Physical Artwork Redemption\nCreators can attach physical items to mints, enabling hybrid digital–physical drops.']
  },
  {
    label: 'LAYER 2 — NEXT', title: 'ARTIST + COLLECTOR PROFILES & GALLERIES', color: CHARTREUSE, x: 5.25,
    items: ['Wallets become galleries\nPersonalized artwork viewers optimized for desktop and mobile.', 'Social by design\nInterfaces built for following, discovery, and community interaction around art.', 'Referral rewards for tastemakers\nTrackable links and revenue share for KOLs who bring new creators and collectors to the platform.', 'Identity layer\nProfiles as the cultural anchor — reputations built through taste, activity, and curation across chains.']
  },
  {
    label: 'LAYER 3 — FUTURE', title: 'SECONDARY + SOCIAL LAYER', color: VIOLET, x: 10,
    items: ['Fully integrated secondary market\nTrade directly within profiles and galleries.', 'Multiple trading modes\nBuy from profiles, trade inside galleries, or use a standard trading dashboard.', 'Multi-chain secondary trading\nETH and Solana side by side.', 'Escrowed P2P deals\nEscrowed sales chats, guestbook, and comments woven into the social layer.', 'Proof-of-Tastemaker\nReputation system that rewards early discovery and cultural curation.', 'Platform fees\nRevenue on all secondary trades and physical sales.']
  }
];
layers.forEach(layer => {
  slide.addShape(pptx.shapes.RECTANGLE, { x: layer.x, y: 2.2, w: 0.03, h: 5.5, fill: { color: layer.color } });
  slide.addText(layer.label, { x: layer.x + 0.2, y: 2.2, w: 4.5, h: 0.25, fontSize: 10, color: MID, fontFace: 'Helvetica', bold: true });
  slide.addText(layer.title, { x: layer.x + 0.2, y: 2.4, w: 4.5, h: 0.45, fontSize: 14, color: layer.color, fontFace: 'Georgia', bold: true });
  layer.items.forEach((item, j) => {
    const [head, ...rest] = item.split('\n');
    const y = 3.0 + j * 0.85;
    slide.addText(head, { x: layer.x + 0.2, y: y, w: 4.5, h: 0.25, fontSize: 11, color: DARK, fontFace: 'Helvetica', bold: true });
    slide.addText(rest.join('\n'), { x: layer.x + 0.2, y: y + 0.25, w: 4.5, h: 0.5, fontSize: 11, color: DARK, fontFace: 'Helvetica' });
  });
});
addFooter(slide, 7);

// ═══════════════════════════════════════════════════
// SLIDE 8 — MARKET OPPORTUNITY
// ═══════════════════════════════════════════════════
slide = pptx.addSlide();
slide.background = { color: BG };
slide.addText('07', { x: 0.6, y: 0.3, w: 1, h: 0.3, fontSize: 11, color: CRIMSON, fontFace: 'Helvetica', bold: true });
slide.addText('MARKET OPPORTUNITY', { x: 0.6, y: 0.4, w: 10, h: 0.9, fontSize: 52, color: ROSE, fontFace: 'Georgia', bold: true });
slide.addText('A $48.7B market with no platform built for fandom.', { x: 0.6, y: 1.2, w: 10, h: 0.4, fontSize: 18, color: DARK, fontFace: 'Georgia', italic: true });

// Bar chart data
slide.addText('NFT USERS WORLDWIDE', { x: 0.6, y: 1.8, w: 5, h: 0.3, fontSize: 10, color: DARK, fontFace: 'Helvetica', bold: true });
slide.addText('Statista, DemandSage', { x: 3.5, y: 1.8, w: 3, h: 0.3, fontSize: 9, color: MID, fontFace: 'Helvetica', align: 'right' });

slide.addText('MONTHLY SALES VOLUME, Q4 2024', { x: 8, y: 1.8, w: 5, h: 0.3, fontSize: 10, color: DARK, fontFace: 'Helvetica', bold: true });
slide.addText('CryptoSlam', { x: 12, y: 1.8, w: 2.5, h: 0.3, fontSize: 9, color: MID, fontFace: 'Helvetica', align: 'right' });

const marketPoints = [
  { num: '01', title: '$48.7B market, 2025', body: 'All trading, no culture. 85% of volume flows through platforms with no social layer, no identity, no community. Just trading. (Source: Precedence Research, 2025)', color: ROSE },
  { num: '02', title: 'Built for growth, not flipping', body: 'Artists and collectors need spaces to start small and grow together.', color: CHARTREUSE },
  { num: '03', title: 'The 2021 cycle was a beginning, not an ending', body: 'The boom-and-bust burned speculators but proved demand. What survived is a permanent behavioral shift — digitally native generations see digital ownership as natural as streaming. As these collectors enter peak spending years, this market doesn\'t contract. It compounds.', color: TANGERINE },
  { num: '04', title: 'The gap is massive', body: "The next dominant platform won't be another marketplace — it will be the cultural layer where collecting begins.", color: CRIMSON },
  { num: '05', title: 'Early-stage culture is unserved', body: 'No platform supports the messy, identity-driven beginning of the collector funnel.', color: SAFFRON },
];
const mCols = [[0, 1, 3], [2], [4]]; // column assignments
marketPoints.forEach((p, i) => {
  const col = i < 2 ? 0 : i < 3 ? 1 : 2;
  const row = i < 2 ? i : i < 3 ? 0 : i - 3;
  const x = 0.6 + col * 4.8;
  const y = 5.2 + row * 1.4;
  slide.addShape(pptx.shapes.RECTANGLE, { x: x - 0.1, y: y, w: 0.03, h: 1.3, fill: { color: p.color } });
  slide.addText(p.title.toUpperCase(), { x: x, y: y, w: 4.5, h: 0.35, fontSize: 12, color: p.color, fontFace: 'Georgia', bold: true });
  slide.addText(p.body, { x: x, y: y + 0.35, w: 4.5, h: 0.9, fontSize: 10, color: DARK, fontFace: 'Helvetica' });
});
addFooter(slide, 8);

// ═══════════════════════════════════════════════════
// SLIDE 9 — COMPETITION
// ═══════════════════════════════════════════════════
slide = pptx.addSlide();
slide.background = { color: BG };
slide.addText('08', { x: 6.8, y: 0.3, w: 1, h: 0.3, fontSize: 11, color: CRIMSON, fontFace: 'Helvetica', bold: true });
slide.addText('COMPETITION', { x: 1, y: 0.3, w: 13, h: 1.2, fontSize: 72, color: CRIMSON, fontFace: 'Georgia', bold: true, align: 'center' });
slide.addText("Existing platforms optimize for one task.\nVVV builds the full cultural stack.", { x: 2, y: 1.4, w: 11, h: 0.7, fontSize: 20, color: DARK, fontFace: 'Georgia', italic: true, align: 'center' });

const competitors = [
  { title: 'OpenSea · Magic Eden · Tensor', body: 'Trading terminals. Built for trading infrastructure, not culture. They optimize for technical execution while ignoring every social and cultural factor that actually drives growth and keeps people coming back.', color: ROSE },
  { title: 'LaunchMyNFT', body: 'A deployment tool, not a platform. Upload, mint, done. No community, no secondary market, no cultural context.', color: CHARTREUSE },
  { title: 'Zora', body: 'Mindshare token speculation. Not a cultural platform — a speculation layer.', color: VIOLET },
  { title: 'VVV.SO: the full cultural stack', body: 'The only platform unifying minting, gallery interfaces, social discovery, reputation, and secondary market into one cultural ecosystem — built by artists, collectors, and curators.', color: SAFFRON },
];
competitors.forEach((c, i) => {
  const y = 2.4 + i * 1.2;
  slide.addText(c.title, { x: 3, y: y, w: 9, h: 0.35, fontSize: 18, color: c.color, fontFace: 'Georgia', bold: true });
  slide.addText(c.body, { x: 3, y: y + 0.35, w: 9, h: 0.7, fontSize: 13, color: DARK, fontFace: 'Helvetica' });
});
addFooter(slide, 9);

// ═══════════════════════════════════════════════════
// SLIDE 10 — WHY NOW
// ═══════════════════════════════════════════════════
slide = pptx.addSlide();
slide.background = { color: BG };
slide.addText('09', { x: 13.5, y: 0.3, w: 1, h: 0.3, fontSize: 11, color: CRIMSON, fontFace: 'Helvetica', bold: true, align: 'right' });
slide.addText('WHY NOW', { x: 7, y: 0.2, w: 7.5, h: 1.2, fontSize: 72, color: TANGERINE, fontFace: 'Georgia', bold: true, align: 'right' });
slide.addText("The tech infrastructure is ready.\nThe cultural infrastructure doesn't exist yet.", { x: 7, y: 1.3, w: 7.5, h: 0.7, fontSize: 18, color: DARK, fontFace: 'Georgia', italic: true, align: 'right' });

const whyNow = [
  { num: '01', title: "Legacy institutions can't bridge this gap", body: 'Culture online needs native crypto platforms, not legacy intermediaries.', color: CRIMSON },
  { num: '02', title: 'Collectors want culture, not dashboards', body: 'They want identity, narrative, and community — not just trading interfaces.', color: VIOLET },
  { num: '03', title: '74% of HNW collectors are Millennials or Gen Z', body: 'The first generation that grew up with NFTs — ready for platforms that treat collections as culture, not just assets.', color: CHARTREUSE },
  { num: '04', title: "Ethereum's art history is losing context", body: "Recontextualizing generative, 1/1 work, and even PFPs within a living ecosystem is a massive untapped opportunity to reinvigorate an entire generation of collectorship.", color: TANGERINE },
  { num: '05', title: 'Capital is rising. Culture converts it.', body: 'Speculation becomes long-term investment when culture is the substrate. No one else is building that layer.', color: SAFFRON },
];
whyNow.forEach((w, i) => {
  const y = 2.2 + i * 1.15;
  slide.addText(w.num, { x: 13.5, y: y, w: 1, h: 0.25, fontSize: 9, color: DARK, fontFace: 'Helvetica', bold: true, align: 'right' });
  slide.addText(w.title.toUpperCase(), { x: 6.5, y: y + 0.15, w: 8, h: 0.35, fontSize: 18, color: w.color, fontFace: 'Georgia', bold: true, align: 'right' });
  slide.addText(w.body, { x: 6.5, y: y + 0.5, w: 8, h: 0.5, fontSize: 13, color: DARK, fontFace: 'Helvetica', align: 'right' });
});
addFooter(slide, 10);

// ═══════════════════════════════════════════════════
// SLIDE 11 — BUSINESS MODEL
// ═══════════════════════════════════════════════════
slide = pptx.addSlide();
slide.background = { color: BG };
slide.addText('10', { x: 0.6, y: 0.3, w: 1, h: 0.3, fontSize: 11, color: CRIMSON, fontFace: 'Helvetica', bold: true });
slide.addText('BUSINESS\nMODEL', { x: 0.6, y: 0.5, w: 8, h: 2, fontSize: 72, color: CRIMSON, fontFace: 'Georgia', bold: true });
slide.addText('Four revenue streams\npowering sustainable growth.', { x: 0.6, y: 2.5, w: 8, h: 0.7, fontSize: 22, color: CHARTREUSE, fontFace: 'Georgia', italic: true });

const bizPoints = [
  { num: '01', title: 'Primary Market Fees', body: '2.2% fee on launchpad mints. Live and generating revenue today.', color: CRIMSON },
  { num: '02', title: 'Secondary Market Fees', body: 'Fees on all secondary trades on-platform across SOL and ETH markets.', color: VIOLET },
  { num: '03', title: 'Physical Redemption + Merch', body: 'Fees on physical item redemptions linked to NFTs, artist and platform merch.', color: CHARTREUSE },
  { num: '04', title: 'Premium Customization', body: 'Fees on premium profile and gallery customization features.', color: TANGERINE },
];
bizPoints.forEach((b, i) => {
  const col = i % 2;
  const row = Math.floor(i / 2);
  const x = 0.6 + col * 6;
  const y = 3.5 + row * 1.5;
  slide.addText(b.num, { x: x, y: y, w: 0.5, h: 0.25, fontSize: 9, color: DARK, fontFace: 'Helvetica', bold: true });
  slide.addText(b.title.toUpperCase(), { x: x, y: y + 0.2, w: 5.5, h: 0.4, fontSize: 22, color: b.color, fontFace: 'Georgia', bold: true });
  slide.addText(b.body, { x: x, y: y + 0.6, w: 5.5, h: 0.5, fontSize: 13, color: DARK, fontFace: 'Helvetica' });
});

slide.addText('An end-to-end hub for the entire ecosystem. Everything flows through VVV.', { x: 0.6, y: 6.8, w: 10, h: 0.4, fontSize: 16, color: ROSE, fontFace: 'Georgia', italic: true });
addFooter(slide, 11);

// ═══════════════════════════════════════════════════
// SLIDE 12 — PRODUCT ROADMAP
// ═══════════════════════════════════════════════════
slide = pptx.addSlide();
slide.background = { color: BG };
slide.addText('11', { x: 0.6, y: 5.8, w: 1, h: 0.3, fontSize: 11, color: CRIMSON, fontFace: 'Helvetica', bold: true });
slide.addText('PRODUCT\nROADMAP', { x: 0.6, y: 6, w: 5, h: 2, fontSize: 56, color: ROSE, fontFace: 'Georgia', bold: true });

const roadmap = [
  { phase: 'Q1 2026', title: 'Artist + Collector Profiles & Galleries', body: 'Public launch. Wallets become galleries — personalized artwork viewers optimized for desktop and mobile.', color: CRIMSON },
  { phase: 'Q1–Q2 2026', title: 'Social Layer', body: 'Dynamic social interactions — follow, notifications, collecting feeds for friends and tastemakers. P2P swaps.', color: VIOLET },
  { phase: 'Q3–Q4 2026', title: 'Secondary Market', body: 'Multi-chain secondary market — buy from profiles, P2P escrow across SOL and ETH, streamlined trading, and a reputation layer highlighting trusted collectors and tastemakers.', color: CHARTREUSE },
];
roadmap.forEach((r, i) => {
  const y = 1 + i * 2.2;
  slide.addShape(pptx.shapes.RECTANGLE, { x: 7.2, y: y, w: 0.03, h: 1.8, fill: { color: r.color } });
  slide.addText(r.phase.toUpperCase(), { x: 7.4, y: y, w: 7, h: 0.25, fontSize: 10, color: MID, fontFace: 'Helvetica', bold: true });
  slide.addText(r.title.toUpperCase(), { x: 7.4, y: y + 0.25, w: 7, h: 0.5, fontSize: 22, color: r.color, fontFace: 'Georgia', bold: true });
  slide.addText(r.body, { x: 7.4, y: y + 0.75, w: 7, h: 0.8, fontSize: 14, color: DARK, fontFace: 'Helvetica' });
});
addFooter(slide, 12);

// ═══════════════════════════════════════════════════
// SLIDE 13 — TEAM
// ═══════════════════════════════════════════════════
slide = pptx.addSlide();
slide.background = { color: BG };
slide.addText('12', { x: 6.8, y: 0.2, w: 1, h: 0.3, fontSize: 11, color: CRIMSON, fontFace: 'Helvetica', bold: true });
slide.addText('TEAM', { x: 3, y: 0.2, w: 9, h: 1, fontSize: 72, color: TANGERINE, fontFace: 'Georgia', bold: true, align: 'center' });

const team = [
  {
    name: 'Jared Madere', role: 'Co-Founder & CEO',
    img: 'backgrounds/monkeys/isolate/jared-monkey copy.png',
    bio: "Jared is an artist, curator, gallerist, and writer. His work has been shown at the Whitney Museum, Le Magasin, La Panacée, The Istanbul Biennial and other venues internationally. He has been featured in The New York Times, Interview, Spike, and Artforum.\n\nIn 2021, Madere opened Yeche Lange, an NFT gallery with a physical space in New York. Prior to that he ran the galleries Bed-Stuy Love Affair and Mother Culture in New York and Los Angeles.\n\nHe has spoken about AI media synthesis at Art Basel Switzerland and written numerous essays on the subject. He has also spoken about NFTs at FWB Festival and Commons New York.",
    x: 0.5
  },
  {
    name: 'Ramon\nHungerbühler', role: 'Co-Founder & COO',
    img: 'backgrounds/monkeys/isolate/ramon-monkey copy.png',
    bio: "Ramon co-founded the Swiss skateboard brand The Straight and Narrow in 2012, serving as Creative Director, Brand Strategist & Operations Lead until 2020.\n\nHe entered the NFT space in March 2021 with his debut collection THEM Hats, going on to release multiple collections since. Since 2024, he has launched and consulted memecoin projects, scaling multiple to multi-million dollar market caps.\n\nRamon holds a Master's degree from the Zurich University of the Arts, where he led an independent study in blockchain and crypto culture.",
    x: 5.25
  },
  {
    name: 'Miles Peyton', role: 'Co-Founder & CTO',
    img: 'backgrounds/monkeys/isolate/miles-monkey copy.png',
    bio: "Prior to VVV, Miles founded and led development of Purity Finance, scaling it to thousands of users. At Galerie Yeche Lange, he bridged contemporary art with blockchain culture through bespoke minting experiences and immersive virtual exhibitions.\n\nAs a graphics engineer at The New York Times, he developed award-winning interactive and AR journalism.\n\nWith five years in crypto, Miles holds a degree in Computer Science and Art from Carnegie Mellon and an MFA in media art from UCLA, where he studied under Casey Reas.",
    x: 10
  },
];
team.forEach(t => {
  try { slide.addImage({ path: path.resolve(t.img), x: t.x + 0.5, y: 1.2, w: 3, h: 3 }); } catch(e) {}
  slide.addText(t.name.toUpperCase(), { x: t.x, y: 4.2, w: 4.5, h: 0.6, fontSize: 18, color: CRIMSON, fontFace: 'Georgia', bold: true, align: 'center' });
  slide.addText(t.role.toUpperCase(), { x: t.x, y: 4.7, w: 4.5, h: 0.3, fontSize: 9, color: DARK, fontFace: 'Helvetica', bold: true, align: 'center' });
  slide.addText(t.bio, { x: t.x, y: 5.1, w: 4.5, h: 3, fontSize: 9, color: DARK, fontFace: 'Helvetica' });
});
addFooter(slide, 13);

// ═══════════════════════════════════════════════════
// SLIDE 14 — THANK YOU
// ═══════════════════════════════════════════════════
slide = pptx.addSlide();
slide.background = { color: BG };
try { slide.addImage({ path: path.resolve('backgrounds/monkeys/isolate/91f10ea6-3b69-4d33-b0ac-dae569b783bf copy.png'), x: 5.5, y: 1.5, w: 4, h: 4 }); } catch(e) {}
slide.addText('Thank you!', { x: 2, y: 5.5, w: 11, h: 1, fontSize: 48, color: VIOLET, fontFace: 'Georgia', italic: true, align: 'center' });
slide.addText('vvv.so', { x: 2, y: 6.8, w: 11, h: 0.5, fontSize: 14, color: MID, fontFace: 'Helvetica', align: 'center' });
addFooter(slide, 14);

// ═══════════════════════════════════════════════════
// SAVE
// ═══════════════════════════════════════════════════
pptx.writeFile({ fileName: path.resolve(__dirname, 'VVV-Deck.pptx') })
  .then(() => console.log('PPTX generated: VVV-Deck.pptx'))
  .catch(err => console.error(err));
