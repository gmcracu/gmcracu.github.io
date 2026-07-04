const toggle = document.getElementById('langToggle');
const year = document.getElementById('year');
year.textContent = new Date().getFullYear();

let currentLang = localStorage.getItem('siteLang') || 'ro';

function applyLanguage(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-ro][data-en]').forEach((el) => {
    el.textContent = el.dataset[lang];
  });
  toggle.textContent = lang === 'ro' ? 'EN' : 'RO';
  localStorage.setItem('siteLang', lang);
}

toggle.addEventListener('click', () => {
  currentLang = currentLang === 'ro' ? 'en' : 'ro';
  applyLanguage(currentLang);
});

applyLanguage(currentLang);
