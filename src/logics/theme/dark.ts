import { darkCssIsReady, loadDarkThemeCss } from 'vite-plugin-theme/es/client';
import { addClass, hasClass, removeClass } from '/@/utils/domUtils';

export async function updateDarkTheme(mode: string | null = 'light') {
  const htmlRoot = document.querySelector('#htmlRoot');
  if (!htmlRoot) {
    return;
  }
  const hasDarkClass = hasClass(htmlRoot, 'dark');
  if (mode === 'dark') {
    if (import.meta.env.PROD && !darkCssIsReady) {
      await loadDarkThemeCss();
    }
    htmlRoot.dataset.theme = 'dark';
    if (!hasDarkClass) {
      addClass(htmlRoot, 'dark');
    }
  } else {
    htmlRoot.dataset.theme = 'light';
    if (hasDarkClass) {
      removeClass(htmlRoot, 'dark');
    }
  }
}
