import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run ui:serve',
        production: 'nx run ui:preview',
      },
      ciWebServerCommand: 'nx run ui:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
