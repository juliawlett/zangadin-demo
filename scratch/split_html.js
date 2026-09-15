import fs from 'fs';
import path from 'path';

const htmlPath = path.resolve('zangadin-demo.html');
const content = fs.readFileSync(htmlPath, 'utf8');

fs.mkdirSync('src/components', { recursive: true });
fs.mkdirSync('src/layouts', { recursive: true });
fs.mkdirSync('src/pages', { recursive: true });

function extractBetween(startStr, endStr, includeTags = true) {
  const startIndex = content.indexOf(startStr);
  if (startIndex === -1) return '';
  const endIndex = content.indexOf(endStr, startIndex + startStr.length);
  if (endIndex === -1) return '';
  if (includeTags) {
    return content.substring(startIndex, endIndex + endStr.length);
  } else {
    return content.substring(startIndex + startStr.length, endIndex);
  }
}

// 1. Gallery
const galleryHtml = extractBetween('<section class="gallery">', '</section>');
fs.writeFileSync('src/components/Gallery.astro', galleryHtml);
console.log('Gallery.astro created, length:', galleryHtml.length);

// 2. Reviews
const reviewsHtml = extractBetween('<section class="reviews" id="avaliacoes">', '</section>');
fs.writeFileSync('src/components/Reviews.astro', reviewsHtml);
console.log('Reviews.astro created, length:', reviewsHtml.length);

// 3. Locations
const locationsHtml = extractBetween('<section class="locations" id="unidades">', '</section>');
fs.writeFileSync('src/components/Locations.astro', locationsHtml);
console.log('Locations.astro created, length:', locationsHtml.length);

// 4. FinalCTA
const finalCtaHtml = extractBetween('<section class="final-cta">', '</section>');
fs.writeFileSync('src/components/FinalCTA.astro', finalCtaHtml);
console.log('FinalCTA.astro created, length:', finalCtaHtml.length);

// 5. Footer
const footerHtml = extractBetween('<footer class="footer">', '</footer>');
fs.writeFileSync('src/components/Footer.astro', footerHtml);
console.log('Footer.astro created, length:', footerHtml.length);

// 6. MobileBar
const mobileBarHtml = extractBetween('<div class="mobile-bar">', '</div>\n\n<script>');
fs.writeFileSync('src/components/MobileBar.astro', mobileBarHtml);
console.log('MobileBar.astro created, length:', mobileBarHtml.length);

// Write Layout.astro
const layoutCode = `---
interface Props {
  title?: string;
  description?: string;
}

const { 
  title = "Zangadin Barbearia — Agende seu horário em Cuiabá",
  description = "A Zangadin Barbearia oferece cortes de cabelo e barba com atendimento técnico e impecável em Cuiabá — MT."
} = Astro.props;
---

<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <meta name="description" content={description}>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/src/styles/global.css">
</head>
<body id="top">
  <slot />

  <script>
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => observer.observe(el));

    const header = document.querySelector(".header");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        header?.classList.add("scrolled");
      } else {
        header?.classList.remove("scrolled");
      }
    }, { passive: true });
  </script>
</body>
</html>
`;

fs.writeFileSync('src/layouts/Layout.astro', layoutCode);
console.log('Layout.astro created');

// Write index.astro
const indexCode = `---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Hero from '../components/Hero.astro';
import ProofBand from '../components/ProofBand.astro';
import Experience from '../components/Experience.astro';
import Subscription from '../components/Subscription.astro';
import Services from '../components/Services.astro';
import Gallery from '../components/Gallery.astro';
import Reviews from '../components/Reviews.astro';
import Locations from '../components/Locations.astro';
import FinalCTA from '../components/FinalCTA.astro';
import Footer from '../components/Footer.astro';
import MobileBar from '../components/MobileBar.astro';
---

<Layout>
  <Header />
  <main>
    <Hero />
    <ProofBand />
    <Experience />
    <Subscription />
    <Services />
    <Gallery />
    <Reviews />
    <Locations />
    <FinalCTA />
  </main>
  <Footer />
  <MobileBar />
</Layout>
`;

fs.writeFileSync('src/pages/index.astro', indexCode);
console.log('index.astro created successfully');
