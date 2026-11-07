import styles from './ProjectMetadata.module.scss';

export default function ProjectMetadata({ project, includeYear = false }) {
  const tags = [...project.type.split(' · '), ...(includeYear && project.year ? [project.year] : [])];
  return <div className={styles.tags}>{tags.map((tag, index) => <span key={tag} style={{ '--tag-delay': `${index * 80}ms` }}>{tag}</span>)}</div>;
}
