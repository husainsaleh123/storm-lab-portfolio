import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import { useLanguage } from '../../context/LanguageContext';
import stormLabLogo from '../../assets/images/storm-lab-logo.png';

const navigation = [
  { id: 'home', href: '/#top' },
  { id: 'about', href: '/about' },
  { id: 'work', href: '/work' },
  { id: 'contact', href: '/contact' },
];

export default function Header() {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const activePage = () => {
    if (location.pathname === '/about') return 'about';
    if (location.pathname === '/contact') return 'contact';
    if (location.pathname.startsWith('/work') || location.pathname.startsWith('/projects')) return 'work';
    return 'home';
  };
  const [active, setActive] = useState(activePage);

  useEffect(() => {
    if (location.pathname === '/about') { setActive('about'); return; }
    if (location.pathname === '/contact') { setActive('contact'); return; }
    if (location.pathname.startsWith('/work') || location.pathname.startsWith('/projects')) { setActive('work'); return; }
    if (location.pathname !== '/') return;

    const hashSection = location.hash.slice(1);
    if (navigation.some(item => item.id === hashSection)) setActive(hashSection);

    const syncActiveSection = () => {
      const marker = window.scrollY + 96 + window.innerHeight * 0.2;
      const current = navigation
        .map(item => document.getElementById(item.id))
        .filter(Boolean)
        .reduce((selected, section) => section.offsetTop <= marker ? section.id : selected, 'home');
      setActive(current);
    };

    const frame = window.requestAnimationFrame(syncActiveSection);
    window.addEventListener('scroll', syncActiveSection, { passive: true });
    window.addEventListener('resize', syncActiveSection);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', syncActiveSection);
      window.removeEventListener('resize', syncActiveSection);
    };
  }, [location.pathname, location.hash]);

  const select = id => {
    setActive(id);
    setOpen(false);
  };

  return <header className={styles.header}>
    <a className={styles.brand} href="/#top" onClick={() => select('home')} aria-label="Storm Lab home">
      <img src={stormLabLogo} alt="Storm Lab" />
    </a>
    <button className={styles.toggle} onClick={() => setOpen(!open)} aria-label={t.nav.menu} aria-expanded={open}>{open ? '×' : '☰'}</button>
    <nav className={open ? styles.open : ''} aria-label="Main navigation">
      {navigation.map(item => <a
        key={item.id}
        href={item.href}
        className={active === item.id ? styles.active : ''}
        aria-current={active === item.id ? 'page' : undefined}
        onClick={() => select(item.id)}
      >{t.nav[item.id]}</a>)}
    </nav>
    <div className={styles.actions}>
      <button className={styles.language} onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')} lang={language === 'en' ? 'ar' : 'en'} aria-label={language === 'en' ? 'العربية' : 'English'}>{language === 'en' ? 'العربية' : 'EN'}</button>
    </div>
  </header>;
}
