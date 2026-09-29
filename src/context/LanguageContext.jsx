/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LanguageContext = createContext(null);

const copy = {
  en: {
    nav: { home: 'Home', work: 'Work', about: 'About', contact: 'Contact', menu: 'Toggle navigation' },
    home: {
      eyebrow: 'Multimedia designer · Bahrain', titleA: 'Ideas made', titleB: 'visible.', intro: 'I’m Husain Ali — a multidisciplinary designer creating identities, digital experiences and visual stories with clarity and character.', seeWork: 'See selected work', marquee: 'BRANDING ✦ UI/UX ✦ SOCIAL MEDIA ✦ PHOTOGRAPHY ✦ VIDEO EDITING ✦ BRANDING ✦ UI/UX ✦ SOCIAL MEDIA ✦', selected: '01 / Selected work', workTitle: 'A mix of pixels, people & purpose.', coming: 'Cover image coming soon', viewMore: 'View more', aboutLabel: '02 / About', aboutTitle: 'Designing the idea behind the image.', aboutCopy: 'I work across graphic design, interfaces, photography and motion. My approach is curious, collaborative and grounded in the belief that good design should feel effortless—even when the thinking behind it isn’t.', aboutMore: 'View More', contactLabel: '03 / Get in touch', contactTitle: 'Have an idea?', contactAccent: 'Let’s make it real.', start: 'Start a project'
    },
    contact: { kicker: 'Let’s collaborate', titleA: 'Start a', titleB: 'project.', intro: 'Have a project in mind, or simply want to say hello? Share a few details and I’ll get back to you.', name: 'Your name', email: 'Email address', phone: 'Phone number', company: 'Company (optional)', companyPlaceholder: 'Your company or studio', message: 'Tell me about your project', messagePlaceholder: 'Project type, timeline, goals…', send: 'Send message', sending: 'Sending…', nameError: 'Please enter your name.', emailError: 'Please enter a valid email address.', phoneError: 'Please enter a valid phone number.', messageError: 'Please tell me a little about your project.', success: 'Thank you — your message has been sent. I’ll be in touch soon.', error: 'Your message could not be sent. Please try again.' },
    project: { all: 'All work', role: 'Role', project: 'Project', next: 'Next project', cover: 'Upload cover image later', problem: 'The problem', approach: 'The approach', solution: 'The solution', contribution: 'My contribution', results: 'The results' },
    footer: 'Graphic designer based in Bahrain.'
  },
  ar: {
    nav: { home: 'الرئيسية', work: 'الأعمال', about: 'عني', contact: 'تواصل', menu: 'فتح قائمة التنقل' },
    home: {
      eyebrow: 'مصمم جرافيك · البحرين', titleA: 'أفكار تتحول', titleB: 'إلى واقع.', intro: 'أنا حسين علي — مصمم متعدد التخصصات أصنع الهويات والتجارب الرقمية والقصص البصرية بوضوح وشخصية مميزة.', seeWork: 'شاهد أعمالي المختارة', marquee: 'الهوية البصرية ✦ تجربة المستخدم ✦ التواصل الاجتماعي ✦ التصوير ✦ تحرير الفيديو ✦ الهوية البصرية ✦ تجربة المستخدم ✦ التواصل الاجتماعي ✦', selected: '01 / أعمال مختارة', workTitle: 'مزيج من الإبداع، الناس والهدف.', coming: 'صورة المشروع قريباً', viewMore: 'اعرف المزيد', aboutLabel: '02 / عني', aboutTitle: 'أصمم الفكرة وراء الصورة.', aboutCopy: 'أعمل في التصميم الجرافيكي والواجهات والتصوير والحركة. منهجي فضولي وتعاوني، ومبني على أن التصميم الجيد يجب أن يبدو سلساً حتى عندما يتطلب الكثير من التفكير.', aboutMore: 'اعرف المزيد', contactLabel: '03 / تواصل معي', contactTitle: 'لديك فكرة؟', contactAccent: 'لنحولها إلى واقع.', start: 'ابدأ مشروعاً'
    },
    contact: { kicker: 'لنتعاون معاً', titleA: 'ابدأ', titleB: 'مشروعاً.', intro: 'لديك مشروع أو ترغب فقط في إلقاء التحية؟ شاركني بعض التفاصيل وسأتواصل معك.', name: 'الاسم', email: 'البريد الإلكتروني', phone: 'رقم الهاتف', company: 'الشركة (اختياري)', companyPlaceholder: 'شركتك أو الاستوديو', message: 'حدثني عن مشروعك', messagePlaceholder: 'نوع المشروع، المدة، الأهداف…', send: 'إرسال الرسالة', sending: 'جارٍ الإرسال…', nameError: 'يرجى إدخال الاسم.', emailError: 'يرجى إدخال بريد إلكتروني صحيح.', phoneError: 'يرجى إدخال رقم هاتف صحيح.', messageError: 'يرجى كتابة نبذة عن مشروعك.', success: 'شكراً لك — تم إرسال رسالتك وسأتواصل معك قريباً.', error: 'تعذر إرسال رسالتك. يرجى المحاولة مرة أخرى.' },
    project: { all: 'كل الأعمال', role: 'الدور', project: 'المشروع', next: 'المشروع التالي', cover: 'ستتم إضافة صورة المشروع لاحقاً', problem: 'التحدي', approach: 'المنهج', solution: 'الحل', contribution: 'مساهمتي', results: 'النتائج' },
    footer: 'مصمم جرافيك مقيم في البحرين.'
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('portfolio-language') || 'en');

  useEffect(() => {
    localStorage.setItem('portfolio-language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t: copy[language] }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}
