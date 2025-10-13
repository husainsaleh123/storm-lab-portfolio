// src/pages/Contact/Contact/Contact.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from './Contact.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faPen, faPuzzlePiece, faComment } from '@fortawesome/free-solid-svg-icons';

const initial = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  serviceType: 'Website Redesign & Optimization', // Default to 'Website Redesign & Optimization'
  message: '',
  company: '', // Honeypot field
};

const Contact = () => {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(null); // success or error message
  const [errors, setErrors] = useState({}); // For tracking field-specific errors
  const navigate = useNavigate(); 

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    const errors = {};

    // Validate Name
    if (!form.name.trim()) errors.name = 'Please enter your name.';

    // Validate Email
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'Please enter a valid email.';

    // Validate Phone (if provided)
    if (!form.phone.trim()) errors.phone = 'Please enter your phone number.';
    else if (!/^[\d+()[\]\-\s]{6,20}$/.test(form.phone)) errors.phone = 'Please enter a valid phone number.';

    // Validate Subject
    if (!form.subject.trim()) errors.subject = 'Please add a subject.';

    // Validate Service Type
    if (!form.serviceType) errors.serviceType = 'Please choose a service type.';

    // Validate Message
    if (!form.message.trim()) errors.message = 'Please write a message.';

    setErrors(errors); 
    return Object.keys(errors).length === 0; 
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const isValid = validate(); 
    if (!isValid) return;

    // Bot trap
    if (form.company) return;

    setLoading(true);
    setOk(null);

    try {
        // Send the data to the server
        const res = await fetch('http://localhost:3000/api/contacts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || 'Something went wrong');

        setOk({ type: 'success', msg: 'Thanks! Your message was sent.' });
        setForm(initial);

        // Redirect to ShowContactPage after successful submission
        navigate('/show-contact'); // Navigate to the ShowContactPage

    } catch (error) {
        setOk({ type: 'error', msg: error.message });
    } finally {
        setLoading(false);
    }
};

  return (
    <main className={styles.wrapper}>
      <h2 className={styles.heading}>Stay in touch with us!</h2>

      <form className={styles.card} onSubmit={onSubmit} noValidate>
        <input
          type="text"
          name="company"
          value={form.company}
          onChange={onChange}
          className={styles.honeypot}
          autoComplete="off"
          tabIndex={-1}
        />

        <label className={styles.label}>
          <span><FontAwesomeIcon icon={faUser} className={styles.icon} /> Name</span>
          <input
            name="name"
            placeholder="Your full name"
            value={form.name}
            onChange={onChange}
            className={errors.name ? styles.errorInput : ''}
          />
          {errors.name && <div className={styles.errorMsg}>{errors.name}</div>}
        </label>

        <label className={styles.label}>
          <span><FontAwesomeIcon icon={faEnvelope} className={styles.icon} /> Email</span>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={onChange}
            className={errors.email ? styles.errorInput : ''}
          />
          {errors.email && <div className={styles.errorMsg}>{errors.email}</div>}
        </label>

        <label className={styles.label}>
          <span><FontAwesomeIcon icon={faPhone} className={styles.icon} /> Phone number</span>
          <input
            name="phone"
            placeholder="+1 555 555 5555"
            value={form.phone}
            onChange={onChange}
            className={errors.phone ? styles.errorInput : ''}
          />
          {errors.phone && <div className={styles.errorMsg}>{errors.phone}</div>}
        </label>

        <label className={styles.label}>
          <span><FontAwesomeIcon icon={faPen} className={styles.icon} /> Subject</span>
          <input
            name="subject"
            placeholder="How can we help?"
            value={form.subject}
            onChange={onChange}
            className={errors.subject ? styles.errorInput : ''}
          />
          {errors.subject && <div className={styles.errorMsg}>{errors.subject}</div>}
        </label>

        <label className={styles.label}>
          <span><FontAwesomeIcon icon={faPuzzlePiece} className={styles.icon} /> Select Service Type</span>
          <select
            name="serviceType"
            value={form.serviceType}
            onChange={onChange}
            className={errors.serviceType ? styles.errorInput : ''}
          >
            <option value="Website Redesign & Optimization">Website Redesign & Optimization</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Landing Page Design & Optimization">Landing Page Design & Optimization</option>
            <option value="Other">Other</option>
          </select>
          {errors.serviceType && <div className={styles.errorMsg}>{errors.serviceType}</div>}
        </label>

        <label className={styles.label}>
          <span><FontAwesomeIcon icon={faComment} className={styles.icon} /> Message</span>
          <textarea
            name="message"
            rows={4}
            placeholder="Tell us a bit about your project or question…"
            value={form.message}
            onChange={onChange}
            className={errors.message ? styles.errorInput : ''}
          />
          {errors.message && <div className={styles.errorMsg}>{errors.message}</div>}
        </label>

        <button className={styles.submit} disabled={loading}>
          {loading ? 'Sending…' : '✈ Submit'}
        </button>

        {ok && (
          <div
            className={`${styles.alert} ${ok.type === 'success' ? styles.ok : styles.err}`}
          >
            {ok.msg}
          </div>
        )}
      </form>
    </main>
  );
};

export default Contact;
