import React, { useEffect } from 'react';
import styles from './About.module.scss';
import photoshopLogo from '../../assets/images/adobe-photoshop.png';
import illustratorLogo from '../../assets/images/adobe-illustrator.png';
import afterEffectsLogo from '../../assets/images/adobe-after-effects.png';
import figmaLogo from '../../assets/images/figma.jpg';
import premiereProLogo from '../../assets/images/premier-pro.png';
import canvaLogo from '../../assets/images/canva.png';
import personalPic from '../../assets/images/personl-pic.png';

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
      <div className={styles.portrait}><img src={personalPic} alt="Husain Ali" /></div>
      <div className={styles.copy}>
        <span>01 / My approach</span>
        <h2>Curious by nature.<br/><em>Clear by design.</em></h2>
        <p>I&apos;m Husain Ali, a multimedia designer combining creative thinking with marketing strategy to help brands stand out, connect with their audiences, and achieve business goals.</p>
        <p>From brand identities and digital experiences to motion graphics and content creation, I focus on delivering purposeful solutions that go beyond aesthetics.</p>
        <p>Storm Lab brings together the energy of a storm and the curiosity of a creative lab. The storm represents a rush of ideas, while the lab is where I experiment, refine, and give those ideas direction. Together, they reflect how I turn creative energy into thoughtful design with a clear purpose.</p>
        <a href="/contact">Work with me</a>
      </div>
    </section>

    <section className={styles.software} data-about-reveal>
      <header><span>02 / Familiar software</span><h2>Tools I use to <em>make ideas real.</em></h2></header>
      <div className={styles.softwareGrid}>{software.map((item, index) => <article key={item.name}>
        <div className={styles.softwareIcon}>{item.logo ? <img src={item.logo} alt={item.name} /> : item.short}</div><small>0{index + 1}</small><h3>{item.name}</h3><p>{item.use}</p>
      </article>)}</div>
    </section>

  </main>;
}
