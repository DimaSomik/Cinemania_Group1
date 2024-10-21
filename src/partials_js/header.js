const headerMenuBtn = document.querySelector('.header-menu-btn');
const headerMenu = document.querySelector('.header-menu');

function toggleMenu(event) {
  headerMenu.classList.toggle('active');
  document.body.classList.toggle('lock');

  if (headerMenu.classList.contains('active')) {
    document.addEventListener('click', closeMenuOnClickOutside);
  } else {
    document.removeEventListener('click', closeMenuOnClickOutside);
  }
}

function closeMenuOnClickOutside(event) {
  if (!headerMenu.contains(event.target) && event.target !== headerMenuBtn) {
    headerMenu.classList.remove('active');
    document.body.classList.remove('lock');
    document.removeEventListener('click', closeMenuOnClickOutside);
  }
}

headerMenuBtn.addEventListener('click', toggleMenu);
const menuLinks = document.querySelectorAll('.header-list a');

menuLinks.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});
