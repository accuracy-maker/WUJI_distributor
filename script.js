// Add your monitored business inbox before publishing the enquiry form.
// Example: const ENQUIRY_EMAIL = 'sales@yourdomain.com';
const ENQUIRY_EMAIL = '';

const form = document.querySelector('#enquiry-form');
const formNote = document.querySelector('#form-note');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!ENQUIRY_EMAIL) {
    formNote.textContent = 'To receive enquiries, add your business email to ENQUIRY_EMAIL in script.js, then publish again.';
    formNote.classList.add('form-note-alert');
    return;
  }
  const data = new FormData(form);
  const subject = encodeURIComponent(`Lab enquiry from ${data.get('institution')}`);
  const body = encodeURIComponent([
    `Name: ${data.get('name')}`,
    `Institution: ${data.get('institution')}`,
    `Email: ${data.get('email')}`,
    `Interest: ${data.get('interest')}`,
    '',
    `Project notes: ${data.get('notes') || '(none)'}`
  ].join('\n'));
  window.location.href = `mailto:${ENQUIRY_EMAIL}?subject=${subject}&body=${body}`;
});
