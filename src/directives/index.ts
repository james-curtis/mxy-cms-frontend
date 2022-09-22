/**
 * Configure and register global directives
 */
import { setupPermissionDirective } from './permission';
import { setupLoadingDirective } from './loading';
import type { App } from 'vue';

export function setupGlobDirectives(app: App) {
  setupPermissionDirective(app);
  setupLoadingDirective(app);
}
