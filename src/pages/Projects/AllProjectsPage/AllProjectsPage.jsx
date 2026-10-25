import React, { useMemo, useState } from 'react';
import { portfolioProjects } from '../../../data/portfolioProjects';
import { useLanguage } from '../../../context/LanguageContext';
import styles from './AllProjectsPage.module.scss';

const filters = ['All', 'Graphic Design', 'Branding', 'Animation', 'UI/UX', 'Web design'];

const copy = {
  en: { eyebrow: 'Selected projects · Archive', title: 'Work made with purpose.', intro: 'Explore branding, design, animation and digital experiences. Filter the archive by discipline to find the work most relevant to you.', filterLabel: 'Filter projects by type', all: 'All', project: 'project', projects: 'projects', view: 'View more' },
  ar: { eyebrow: 'مشاريع مختارة · الأرشيف', title: 'أعمال صُممت بهدف.', intro: 'استكشف مشاريع الهوية والتصميم والتحريك والتجارب الرقمية، وصفِّ الأعمال حسب التخصص.', filterLabel: 'تصفية المشاريع حسب النوع', all: 'الكل', project: 'مشروع', projects: 'مشاريع', view: 'اعرف المزيد' },
};

export default function AllProjectsPage() {
  const { language } = useLanguage();
  const text = copy[language];
  const [activeFilter, setActiveFilter] = useState('All');
  const visibleProjects = useMemo(() => activeFilter === 'All' ? portfolioProjects : portfolioProjects.filter(project => project.categories?.includes(activeFilter)), [activeFilter]);

  return <main className={styles.page}>
    <section className={styles.intro}>
      <span>{text.eyebrow}</span>
      <h1>{text.title}</h1>
      <p>{text.intro}</p>
    </section>
    <section className={styles.archive} aria-label={text.filterLabel}>
      <div className={styles.filterBar}>
        <div className={styles.filters} role="group" aria-label={text.filterLabel}>
          {filters.map(filter => <button key={filter} type="button" className={activeFilter === filter ? styles.active : ''} aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)}>{filter === 'All' ? text.all : filter}</button>)}
        </div>
        <p aria-live="polite">{visibleProjects.length} {visibleProjects.length === 1 ? text.project : text.projects}</p>
      </div>
      <div className={styles.grid}>
        {visibleProjects.map((project, index) => {
          const title = language === 'ar' ? project.titleAr : project.title;
          return <a className={styles.card} href={`/work/${project.slug}`} key={project.slug}>
            <div className={styles.image} style={project.coverBackground ? { background: project.coverBackground } : undefined}>
              {project.cover && <img src={project.cover} alt="" style={project.coverFit ? { objectFit: project.coverFit } : undefined} />}
              <span>{String(index + 1).padStart(2, '0')}</span>
            </div>
            <div className={styles.meta}>
              <div><h2>{title}</h2><p>{project.type}</p></div>
              <span className={styles.year}>{project.year}</span>
              <span className={styles.view}>{text.view}</span>
            </div>
          </a>;
        })}
      </div>
    </section>
  </main>;
}
