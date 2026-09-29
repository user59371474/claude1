// 임시 이미지 생성기. 실제 작업물이 생기면 src/assets/work/ 의 같은 이름 파일을 교체하면 된다.
// 색은 tokens.css 팔레트만 사용.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const P = { paper: '#FFFFFF', ink: '#0A0A0A', mute: '#6B6B6B', line: '#DADADA', signal: '#FF2A00' };
const W = 1600, H = 1600;

const patterns = [
  () => `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${P.ink}"/><stop offset="1" stop-color="${P.mute}"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/>`,
  () => `<rect width="100%" height="100%" fill="${P.signal}"/><rect x="${W*.12}" y="${H*.12}" width="${W*.2}" height="${H*.2}" fill="${P.ink}"/>`,
  () => `<rect width="100%" height="100%" fill="${P.paper}"/>` + Array.from({length:64},(_,i)=>`<rect y="${i*25}" width="${W}" height="8" fill="${P.ink}"/>`).join(''),
  () => `<rect width="100%" height="100%" fill="${P.ink}"/><rect x="${W*.08}" y="${H*.84}" width="${W*.3}" height="4" fill="${P.paper}"/>`,
  () => `<rect width="100%" height="100%" fill="${P.ink}"/><circle cx="${W*.36}" cy="${H*.4}" r="${W*.18}" fill="${P.paper}"/>`,
  () => `<rect width="100%" height="100%" fill="${P.line}"/><rect width="${W/2}" height="${H}" fill="${P.ink}"/>`,
  () => `<rect width="100%" height="100%" fill="${P.ink}"/><rect x="${W*.6}" y="${H*.6}" width="${W*.4}" height="${H*.4}" fill="${P.signal}"/>`,
  () => `<rect width="100%" height="100%" fill="${P.paper}"/>` + Array.from({length:120},(_,i)=>`<rect x="${i*14}" width="2" height="${H}" fill="${P.mute}"/>`).join(''),
  () => `<defs><radialGradient id="r" cx=".3" cy=".35" r=".9"><stop offset="0" stop-color="${P.mute}"/><stop offset=".6" stop-color="${P.ink}"/></radialGradient></defs><rect width="100%" height="100%" fill="url(#r)"/><rect x="${W*.08}" y="${H*.62}" width="${W*.22}" height="${W*.22}" fill="${P.signal}"/>`,
];

const svg = (body, w = W, h = H) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">${body}</svg>`);

mkdirSync('src/assets/work', { recursive: true });
const nums = ['003','004','005','006','007','008','009','010','011','012','013','014'];
for (const [i, n] of nums.entries()) {
  for (const [k, suffix] of ['cover', '01', '02'].entries()) {
    const body = patterns[(i + k * 4) % patterns.length]();
    const [w, h] = suffix === 'cover' ? [1600, 1600] : [1920, 1080];
    await sharp(svg(body, w, h)).webp({ quality: 82 }).toFile(`src/assets/work/kdj-${n}-${suffix}.webp`);
  }
}
// 메인 대표작 (16:9)
await sharp(svg(patterns[8](), 1920, 1080)).webp({ quality: 82 }).toFile('src/assets/work/feature.webp');

// OG 이미지 1200x630 (PNG: 카카오톡·SNS 호환)
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="${P.paper}"/><rect x="0" y="0" width="1200" height="56" fill="${P.paper}" stroke="${P.ink}" stroke-width="2"/><text x="40" y="36" font-family="IBM Plex Mono, DejaVu Sans Mono, monospace" font-size="20" fill="${P.ink}">KIMDONGJUNAI/</text><text x="40" y="330" font-family="IBM Plex Mono, DejaVu Sans Mono, monospace" font-size="84" fill="${P.mute}">~/<tspan fill="${P.ink}">kimdongjunai</tspan></text><text x="40" y="430" font-family="IBM Plex Mono, DejaVu Sans Mono, monospace" font-size="84" fill="${P.ink}">archive_2026</text><rect x="668" y="362" width="44" height="76" fill="${P.signal}"/><text x="40" y="590" font-family="IBM Plex Mono, DejaVu Sans Mono, monospace" font-size="20" fill="${P.mute}">DESIGN · FILM · WEB</text></svg>`;
await sharp(Buffer.from(og)).png().toFile('public/og.png');
// 파비콘 PNG
const fav = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><rect width="180" height="180" fill="${P.ink}"/><rect x="104" y="46" width="40" height="88" fill="${P.signal}"/></svg>`;
await sharp(Buffer.from(fav)).png().toFile('public/apple-touch-icon.png');
console.log('placeholders done');
