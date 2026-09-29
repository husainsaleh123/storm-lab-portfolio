import Contact from '../../models/contact.js';
import nodemailer from 'nodemailer';

const RECIPIENT = process.env.CONTACT_EMAIL || 'hussainsaleh180@gmail.com';

async function deliver(contact) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error('Email delivery is not configured. Add SMTP_USER and SMTP_PASS to the server environment.');
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 465),
    secure: String(process.env.SMTP_PORT || '465') === '465',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  await transporter.sendMail({
    from: `Portfolio contact <${process.env.SMTP_USER}>`,
    to: RECIPIENT,
    replyTo: contact.email,
    subject: `New portfolio enquiry from ${contact.name}`,
    text: `Name: ${contact.name}\nEmail: ${contact.email}\nPhone: ${contact.phone}\nCompany: ${contact.company || 'Not provided'}\n\nMessage:\n${contact.message}`,
  });
}

const dataController = {
  async index(req, res, next) { try { res.locals.data.contacts = await Contact.find({}); next(); } catch (error) { res.status(400).json({ error: error.message }); } },
  async show(req, res, next) { try { const contact = await Contact.findById(req.params.id); if (!contact) throw new Error('Contact not found'); res.locals.data.contact = contact; next(); } catch (error) { res.status(400).json({ error: error.message }); } },
  async create(req, res, next) {
    try {
      const { name, email, phone, company, message, website } = req.body;
      if (website) return res.status(201).json({ sent: true });
      if (!name?.trim() || !email?.trim() || !phone?.trim() || !message?.trim()) return res.status(400).json({ error: 'Name, email, phone number, and message are required.' });
      const contact = await Contact.create({ name: name.trim(), email: email.trim(), phone: phone.trim(), company: company?.trim() || '', message: message.trim(), subject: 'Portfolio enquiry', serviceType: 'Other' });
      await deliver(contact);
      res.locals.data.contact = contact;
      next();
    } catch (error) {
      console.error('Contact submission failed:', error.message);
      res.status(500).json({ error: 'Your message could not be delivered. Please try again later.' });
    }
  },
};

const apiController = {
  index(req, res) { res.json(res.locals.data.contacts); },
  show(req, res) { res.json(res.locals.data.contact); },
  create(req, res) { res.status(201).json({ sent: true }); },
};

export { dataController, apiController };
