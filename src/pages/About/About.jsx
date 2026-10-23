import React, { useEffect } from 'react';
import styles from './About.module.scss';
import photoshopLogo from '../../assets/images/adobe-photoshop.png';
import illustratorLogo from '../../assets/images/adobe-illustrator.png';
import afterEffectsLogo from '../../assets/images/adobe-after-effects.png';
import figmaLogo from '../../assets/images/figma.jpg';
import premiereProLogo from '../../assets/images/premier-pro.png';
import canvaLogo from '../../assets/images/canva.png';

const software = [
  { name: 'Adobe Photoshop', short: 'Ps', logo: photoshopLogo, use: 'Image editing & compositing' },
  { name: 'Adobe Illustrator', short: 'Ai', logo: illustratorLogo, use: 'Vector & identity design' },
  { name: 'Adobe Premiere Pro', short: 'Pr', logo: premiereProLogo, use: 'Video editing' },
  { name: 'Adobe After Effects', short: 'Ae', logo: afterEffectsLogo, use: 'Motion graphics' },
  { name: 'Figma', short: 'Fi', logo: figmaLogo, use: 'UI/UX & prototyping' },
  { name: 'Canva', short: 'Ca', logo: canvaLogo, use: 'Social content' },
];

export default function About() {
  useEffect(() => {
    const items = document.querySelectorAll('[data-about-reveal]');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting && entry.target.classList.add(styles.visible));
    }, { threshold: .12 });
    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return <main className={styles.page}>
    <section className={styles.story} data-about-reveal>
      <div className={styles.portrait}><img src="/portfolio/14-1137.jpg" alt="Husain Ali" /></div>
      <div className={styles.copy}>
        <span>01 / My approach</span>
        <h2>Curious by nature.<br/>Clear by design.</h2>
        <p>I work across graphic design, interfaces, photography and motion. My approach is curious, collaborative and grounded in the belief that good design should feel effortless—even when the thinking behind it isn’t.</p>
        <p>I enjoy turning early ideas into thoughtful visual systems: finding the right concept, refining the details and creating work that communicates with clarity and character.</p>
        <a href="/contact">Work with me <b>↗</b></a>
      </div>
    </section>

    <section className={styles.software} data-about-reveal>
      <header><span>02 / Familiar software</span><h2>Tools I use to<br/><em>make ideas real.</em></h2></header>
      <div className={styles.softwareGrid}>{software.map((item, index) => <article key={item.name}>
        <div className={styles.softwareIcon}>{item.logo ? <img src={item.logo} alt={item.name} /> : item.short}</div><small>0{index + 1}</small><h3>{item.name}</h3><p>{item.use}</p>
      </article>)}</div>
    </section>

  </main>;
}
