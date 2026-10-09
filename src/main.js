
// The early script in each HTML file applies the saved theme before paint.
const themeButton = document.querySelector('#theme-toggle');
function updateThemeLabel() {
  const isDark = document.documentElement.classList.contains('dark');
  themeButton.setAttribute('aria-pressed', String(isDark));
  themeButton.textContent = isDark ? 'Dark mode: on' : 'Dark mode: off';
}
updateThemeLabel();
themeButton.addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  // Storage can be blocked; the toggle must still work in that case.
  try { localStorage.setItem('cafe-theme', isDark ? 'dark' : 'light'); }
  catch { /* Continue without saving. */ }
  updateThemeLabel();
});

// These elements exist only on the home page, so check before using them.
const form = document.querySelector('#booking-form');
if (form) {
  const dateInput = document.querySelector('#visit-date');
  // Build today's date in the user's timezone, avoiding UTC date shifts.
  const today = new Date();
  const localDate = [today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0')].join('-');
  dateInput.min = localDate;
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Keep the browser on this page.
    const data = new FormData(form);
    const status = document.querySelector('#booking-status');
    // textContent treats user input as text rather than HTML.
    status.textContent = `Thanks, ${data.get('name')}! Your practice request for ${data.get('guests')} guest(s) on ${data.get('date')} is ready. This demo does not send a booking.`;
    status.focus();
  });
}
