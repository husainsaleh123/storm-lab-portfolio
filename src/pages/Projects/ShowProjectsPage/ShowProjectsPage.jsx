import React, { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { getPortfolioProject, portfolioProjects } from '../../../data/portfolioProjects';
import styles from './ShowProjectsPage.module.scss';
import { useLanguage } from '../../../context/LanguageContext';

export default function ShowProjectsPage(){
  const {language,t}=useLanguage();
  const { slug, id }=useParams();
  const project=getPortfolioProject(slug||id);
  useEffect(()=>{window.scrollTo(0,0)},[slug,id]);
  if(!project)return <Navigate to="/#work" replace/>;
  const current=portfolioProjects.indexOf(project);
  const next=portfolioProjects[(current+1)%portfolioProjects.length];
  const title=language==='ar'?project.titleAr:project.title;
  const nextTitle=language==='ar'?next.titleAr:next.title;
  return <main className={styles.page}>
    <header className={styles.hero}><a href="/#work">← {t.project.all}</a><span>{project.type} / {project.year}</span><h1>{title}</h1><p>{project.overview}</p></header>
    <section className={styles.cover + (project.videoUrl ? ' ' + styles.videoSection : '')} style={(project.coverBackground || project.coverAspectRatio) ? { ...(project.coverBackground && { background: project.coverBackground }), ...(project.coverAspectRatio && { aspectRatio: project.coverAspectRatio }) } : undefined}>{project.cover ? project.videoUrl ? <a className={styles.videoCover} href={project.videoUrl} target="_blank" rel="noreferrer" aria-label={'Watch ' + title + ' on YouTube'}><img src={project.cover} alt={title + ' video thumbnail'} style={project.coverFit ? { objectFit: project.coverFit } : undefined}/></a> : project.url ? <a className={styles.coverLink} href={project.url} target="_blank" rel="noreferrer" aria-label={'View ' + title + ' website'}><img src={project.cover} alt={title} style={project.coverFit ? { objectFit: project.coverFit } : undefined}/></a> : <img src={project.cover} alt={title} style={project.coverFit ? { objectFit: project.coverFit } : undefined}/> : <div><b>{title}</b><span>{t.project.cover}</span></div>}</section>
    <section className={styles.summary}><span>{t.project.role}</span><p>{project.role}</p><span>{t.project.project}</span><p>{project.type}{project.url && <> · <a href={project.url} target="_blank" rel="noreferrer">View live ↗</a></>}</p></section>
    <section className={styles.caseStudy}>
      <CaseSection number="01" title={t.project.problem} copy={project.problem}/><CaseSection number="02" title={t.project.approach} copy={project.approach}/><CaseSection number="03" title={t.project.solution} copy={project.solution}/><CaseSection number="04" title={t.project.contribution} copy={project.contribution}/><CaseSection number="05" title={t.project.results} copy={project.results}/>
    </section>
    <a className={styles.next} href={`/work/${next.slug}`}><span>{t.project.next}</span><strong>{nextTitle} ↗</strong></a>
  </main>;
}
function CaseSection({number,title,copy}){return <article><span>{number}</span><h2>{title}</h2><p>{copy}</p></article>}
