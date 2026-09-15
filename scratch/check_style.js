import fs from 'fs';
const html = fs.readFileSync('zangadin-demo.html', 'utf8');

const styleStart = html.indexOf('<style>');
const styleEnd = html.indexOf('</style>');

if (styleStart !== -1 && styleEnd !== -1) {
  const styleContent = html.substring(styleStart + 7, styleEnd);
  console.log('Original <style> length in HTML:', styleContent.length);
  
  // Check if .reveal is in styleContent
  console.log('.reveal in <style>:', styleContent.includes('.reveal'));
  
  // Save full style to src/styles/global.css
  fs.writeFileSync('src/styles/global.css', styleContent);
  console.log('Saved exact <style> to src/styles/global.css!');
}
