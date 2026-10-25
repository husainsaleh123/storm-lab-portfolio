import React from 'react';
import styles from './Footer.module.scss';
import { useLanguage } from '../../context/LanguageContext';

const socialProfiles = [
  { name: 'Instagram', href: 'https://www.instagram.com/', icon: 'instagram' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'linkedin' },
  { name: 'WhatsApp', href: 'https://wa.me/', icon: 'whatsapp' },
  { name: 'Gmail', href: 'mailto:hussainsaleh180@gmail.com', icon: 'envelope' },
];

export default function Footer() {
  const { t } = useLanguage();

  return <footer className={styles.footer}>
    <b>Storm Lab</b>
    <p>{t.footer}</p>
    <nav className={styles.socials} aria-label="Social media profiles">
      {socialProfiles.map(profile => <a key={profile.name} href={profile.href} target={profile.href.startsWith('http') ? '_blank' : undefined} rel={profile.href.startsWith('http') ? 'noreferrer' : undefined} aria-label={profile.name} title={profile.name}>
        <i className={`fa fa-${profile.icon}`} aria-hidden="true" />
      </a>)}
    </nav>
    <span>© {new Date().getFullYear()}</span>
  </footer>;
}
