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







}
}





