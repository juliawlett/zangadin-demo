import fs from 'fs';
const html = fs.readFileSync('zangadin-demo.html', 'utf8');

const matches = [];
const lines = html.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('reveal')) {
    matches.push({ line: idx + 1, text: line.substring(0, 150) });
  }
});
console.log('Found reveal matches:', matches.slice(0, 10));
