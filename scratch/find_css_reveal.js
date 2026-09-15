import fs from 'fs';
const html = fs.readFileSync('zangadin-demo.html', 'utf8');

const matches = html.match(/\.reveal[^{]*\{[^}]*\}/g);
console.log('Matches for .reveal:', matches);
