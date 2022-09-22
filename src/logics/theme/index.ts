import { replaceStyleVariables } from 'vite-plugin-theme/es/client';
import {
  mixDarken,
  mixLighten,
  tinycolor,
} from 'vite-plugin-theme/es/colorUtils';
import {
  generateColors,
  getThemeColors,
} from '../../../build/config/themeConfig';

export async function changeTheme(color: string) {
  const colors = generateColors({
    mixDarken,
    mixLighten,
    tinycolor,
    color,
  });

  const res = await replaceStyleVariables({
    colorVariables: [...getThemeColors(color), ...colors],
  });
  fixDark();
  return res;
}

// 【LOWCOD-2262】修复黑暗模式下切换皮肤无效的问题
async function fixDark() {
  const el = document.querySelector('#__VITE_PLUGIN_THEME__');
  if (el) {
    el.innerHTML = el.innerHTML.replace(/\\["']dark\\["']/g, `'dark'`);
  }
}
