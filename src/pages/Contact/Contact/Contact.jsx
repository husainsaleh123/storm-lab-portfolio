import React, { useState } from 'react';
import styles from './Contact.module.scss';
import { createContact } from '../../../utilities/contact-api';
import { useLanguage } from '../../../context/LanguageContext';

const emptyForm = { name: '', email: '', phone: '', company: '', message: '', website: '' };

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [sending, setSending] = useState(false);

  const update = event => {
    const { name, value } = event.target;
    setForm(current => ({ ...current, [name]: value }));
    setErrors(current => ({ ...current, [name]: '' }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = t.contact.nameError;
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = t.contact.emailError;
    if (!/^[\d+()[\]\-\s]{6,20}$/.test(form.phone)) next.phone = t.contact.phoneError;
    if (!form.message.trim()) next.message = t.contact.messageError;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async event => {
    event.preventDefault();
    if (form.website || !validate()) return;
    setSending(true);
    setStatus({ type: '', message: '' });
    try {
      await createContact(form);
      setForm(emptyForm);
      setStatus({ type: 'success', message: t.contact.success });
    } catch (error) {
      setStatus({ type: 'error', message: error.message || t.contact.error });
    } finally {
      setSending(false);
    }
  };

  return <main className={styles.page}>
    <section className={styles.intro}>
      <span className={styles.kicker}>{t.contact.kicker}</span>
      <h1><span className={styles.titleLine}>{t.contact.titleA}</span><span className={styles.titleLine}><em>{t.contact.titleB}</em></span></h1>
      <p className={styles.introText}>{t.contact.intro}</p>
      <div className={styles.mark}>↘</div>
    </section>

    <section className={styles.formSide}>
      <form onSubmit={submit} noValidate>
        <input className={styles.honeypot} name="website" value={form.website} onChange={update} tabIndex="-1" autoComplete="off" aria-hidden="true" />
        <div className={styles.row}>
          <Field label={t.contact.name} name="name" value={form.name} error={errors.name} onChange={update} placeholder="Husain Ali" autoComplete="name" />
          <Field label={t.contact.email} name="email" type="email" value={form.email} error={errors.email} onChange={update} placeholder="you@email.com" autoComplete="email" />
        </div>
        <Field label={t.contact.phone} name="phone" type="tel" value={form.phone} error={errors.phone} onChange={update} placeholder="+973 0000 0000" autoComplete="tel" />
        <Field label={t.contact.company} name="company" value={form.company} onChange={update} placeholder={t.contact.companyPlaceholder} autoComplete="organization" />
        <label className={styles.field}>
          <span>{t.contact.message}</span>
          <textarea name="message" rows="6" value={form.message} onChange={update} placeholder={t.contact.messagePlaceholder} aria-invalid={Boolean(errors.message)} />
          {errors.message && <small>{errors.message}</small>}
        </label>
        <button className={styles.submit} disabled={sending}>{sending ? t.contact.sending : t.contact.send} <b>↗</b></button>
        {status.message && <p className={`${styles.status} ${styles[status.type]}`} role="status">{status.message}</p>}
      </form>
    </section>
  </main>;
}

function Field({ label, error, ...props }) {
  return <label className={styles.field}><span>{label}</span><input {...props} aria-invalid={Boolean(error)} />{error && <small>{error}</small>}</label>;
}
