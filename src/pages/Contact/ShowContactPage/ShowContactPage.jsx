import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ShowContactPage.module.scss';

const ShowContactPage = () => {
    const [contact, setContact] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const res = await fetch('/api/contacts');  // Fetch all contacts
                const data = await res.json();
                if (data.length > 0) {
                    setContact(data[data.length - 1]);  // Fetch the last contact (most recent)
                } else {
                    navigate('/');  // Redirect if no contact data is found
                }
            } catch (error) {
                console.error(error);
                navigate('/');  // Redirect on error
            }
        };

        fetchContact();
    }, [navigate]);

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.heading}>Contact Details</h2>

            {contact && (
                <div className={styles.contactDetails}>
                    <p><strong>Name:</strong> {contact.name}</p>
                    <p><strong>Email:</strong> {contact.email}</p>
                    <p><strong>Phone:</strong> {contact.phone}</p>
                    <p><strong>Subject:</strong> {contact.subject}</p>
                    <p><strong>Service Type:</strong> {contact.serviceType}</p>
                    <p><strong>Message:</strong> {contact.message}</p>
                </div>
            )}

            <button onClick={() => navigate('/contact')} className={styles.backButton}>Back to Contact</button>
        </div>
    );
};

export default ShowContactPage;
