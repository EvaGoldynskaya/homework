import { router } from './router.js';
import { renderSettings, initTheme } from './pages/SettingPanel';

renderSettings(); // Рендер панели настроек
initTheme(); // Применение темы
router.start(); // Запуск роутера