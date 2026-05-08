import { store } from '../store/store';
import { setTheme } from '../store/settingsSlice';

// Рендер панели настроек в хедере
export function renderSettings(): void {
  console.log("renderSettings")
  const settingsContainer = document.getElementById('nav-settings');
  if (!settingsContainer) return;

  const state = store.getState();
  
  settingsContainer.innerHTML = `
    <div style="display: flex; gap: 20px; align-items: center;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <span>☀️</span>
        <label class="theme-switch">
          <input type="checkbox" id="themeSwitch" ${state.settings.theme === 'dark' ? 'checked' : ''}>
          <span class="slider"></span>
        </label>
        <span>🌙</span>
      </div>
    </div>
  `;

  // Переключение темы
  const themeSwitch = document.getElementById('themeSwitch') as HTMLInputElement;
  themeSwitch?.addEventListener('change', (e) => {
    const isDark = (e.target as HTMLInputElement).checked;
    const newTheme = isDark ? 'dark' : 'light';
    store.dispatch(setTheme(newTheme));
    applyTheme(newTheme);
  });
}

// Применение темы к странице
function applyTheme(theme: 'light' | 'dark'): void {
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }
}

// Инициализация темы при загрузке
export function initTheme(): void {
  const state = store.getState();
  applyTheme(state.settings.theme);
}