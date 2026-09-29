import React, { useEffect } from 'react';
import styles from './Home.module.scss';
import { portfolioProjects as projects } from '../../data/portfolioProjects';
import { useLanguage } from '../../context/LanguageContext';

export default function Home() {
  const { language, t } = useLanguage();
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add(styles.visible)),
      { threshold: 0.12 }
    );
    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <main className={styles.page}>
    <section className={styles.hero} id="top">
        <div className={styles.eyebrow}>{t.home.eyebrow}</div>
        <h1><span className={styles.heroTitleLine}>{t.home.titleA}</span><span className={styles.heroTitleLine}><em>{t.home.titleB}</em></span></h1>
      <div className={styles.heroBottom}>
        <p>{t.home.intro}</p>
        <a className={styles.roundLink} href="#work" aria-label={t.home.seeWork}>↘</a>
      </div>
    </section>
    <section className={styles.marquee}><div>{t.home.marquee}</div></section>
    <section className={styles.work} id="work">
      <header className={styles.sectionHead} data-reveal><span>{t.home.selected}</span><h2>{t.home.workTitle}</h2></header>
      <div className={styles.grid}>{projects.map((project,index)=>{const title=language==='ar'?project.titleAr:project.title;return <article className={styles.project} key={project.slug} data-reveal>
        <div className={styles.projectImage}>{project.cover ? <img src={project.cover} alt={title}/> : <div className={styles.coverPlaceholder}><b>{title}</b><small>{t.home.coming}</small></div>}<span>0{index+1}</span></div>
        <div className={styles.projectMeta}><div><h3>{title}</h3><p>{project.type}</p></div><a className={styles.projectLink} href={`/work/${project.slug}`}>{t.home.viewMore} <b>↗</b></a></div>
      </article>})}</div>
    </section>
    <section className={styles.about} id="about" data-reveal>
      <div className={styles.portraitWrap}><img src="/portfolio/14-1137.jpg" alt="Husain Ali"/></div>
      <div className={styles.aboutCopy}><span>{t.home.aboutLabel}</span><h2>{t.home.aboutTitle}</h2><p>{t.home.aboutCopy}</p><div className={styles.skills}><span>Adobe Creative Suite</span><span>Figma</span><span>Brand identity</span><span>Content creation</span></div><a className={styles.aboutButton} href="/about">{t.home.aboutMore} <b>↗</b></a></div>
    </section>
    <section className={styles.contact} id="contact" data-reveal><span>{t.home.contactLabel}</span><h2>{t.home.contactTitle}<br/><em>{t.home.contactAccent}</em></h2><a href="/contact">{t.home.start} <b>↗</b></a></section>
  </main>;
}
