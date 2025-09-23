// Recuperar tema guardado en localStorage y aplicarlo al cargar
export function initThemeToggle() {
  const btn = document.getElementById('btnToggleTheme');
  const icon = document.getElementById('themeIcon');
  const label = document.getElementById('themeLabel');

  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);

  // Alternar tema visual y guardar nueva preferencia
  btn.addEventListener('click', () => {
  const newTheme = document.body.classList.contains('has-background-light') ? 'dark' : 'light';
  setTheme(newTheme);
  localStorage.setItem('theme', newTheme);
  });
  
  // Aplicar clases Bulma para adaptar visuales al tema seleccionado
  function setTheme(theme) {
  const body = document.body;
  const navbar = document.querySelector('.navbar');
  const cards = document.querySelectorAll('.card');
  const buttons = document.querySelectorAll('.button');

   if (theme === 'dark') {
    body.classList.remove('has-background-light');
    body.classList.add('has-background-dark', 'has-text-white');

    navbar.classList.add('has-background-success-dark');

    cards.forEach(card => {
      card.classList.remove('has-background-white');
      card.classList.add('has-background-black-ter', 'has-text-white');
    });

    buttons.forEach(btn => {
      btn.classList.remove('is-light');
      btn.classList.add('is-dark');
    });

// Cambiar ícono y texto del botón para reflejar el tema actual
    icon.classList.replace('fa-moon', 'fa-sun');
    label.textContent = 'Claro';
    } else {
    body.classList.remove('has-background-dark', 'has-text-white');
    body.classList.add('has-background-light');

    navbar.classList.remove('has-background-success-dark');

    cards.forEach(card => {
      card.classList.remove('has-background-black-ter', 'has-text-white');
      card.classList.add('has-background-white');
    });

    buttons.forEach(btn => {
      btn.classList.remove('is-dark');
      btn.classList.add('is-light');
    });

    icon.classList.replace('fa-sun', 'fa-moon');
    label.textContent = 'Oscuro';
  }
}
}





