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
    <section className={`${styles.hero} ${styles.contentSection}`} id="top">
        <div className={styles.eyebrow}>{t.home.eyebrow}</div>
        <h1><span className={styles.heroTitleLine}>{t.home.titleA}</span><span className={styles.heroTitleLine}><em>{t.home.titleB}</em></span></h1>
      <div className={styles.heroBottom}>
        <p>{t.home.intro}</p>
        <div className={styles.heroActions}>
          <a className={styles.artworkButton} href="/work">{t.home.viewArtwork}</a>
          <a className={styles.collaborateButton} href="/contact">{t.home.collaborate}</a>
        </div>
      </div>
    </section>
    <section className={`${styles.about} ${styles.contentSection}`} id="about" data-reveal>
      <div className={styles.portraitWrap}><img src="/portfolio/14-1137.jpg" alt="Husain Ali"/></div>
      <div className={styles.aboutCopy}><span>{t.home.aboutLabel}</span><h2>{t.home.aboutTitle}</h2><p>{t.home.aboutCopy}</p><div className={styles.skills}><span>Adobe Creative Suite</span><span>Figma</span><span>Brand identity</span><span>Content creation</span></div><a className={styles.aboutButton} href="/about">{t.home.aboutMore}</a></div>
    </section>
    <section className={`${styles.work} ${styles.contentSection}`} id="work">
      <header className={styles.sectionHead} data-reveal><span>{t.home.selected}</span><h2>{t.home.workTitle}</h2></header>
      <div className={styles.grid}>{projects.map((project,index)=>{const title=language==='ar'?project.titleAr:project.title;return <article className={styles.project} key={project.slug} data-reveal>
        <div className={styles.projectImage} style={{ ...(project.coverBackground && { background: project.coverBackground }), ...(project.coverFrameWidth && { width: project.coverFrameWidth, marginLeft: project.coverFrameOffset }) }}>{project.cover ? <img src={project.cover} alt={title} style={project.coverFit ? { objectFit: project.coverFit } : undefined}/> : <div className={styles.coverPlaceholder}><b>{title}</b><small>{t.home.coming}</small></div>}<span>{String(index + 1).padStart(2, '0')}</span></div>
        <div className={styles.projectMeta}><div><h3>{title}</h3><p>{project.type}</p></div><a className={styles.projectLink} href={`/work/${project.slug}`}>{t.home.viewMore}</a></div>
      </article>})}</div>
    </section>
    <section className={`${styles.contact} ${styles.contentSection}`} id="contact" data-reveal><span>{t.home.contactLabel}</span><h2>{t.home.contactTitle}<br/><em>{t.home.contactAccent}</em></h2><a href="/contact">{t.home.start}</a></section>
  </main>;
}
