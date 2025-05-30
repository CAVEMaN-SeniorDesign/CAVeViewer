import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        maps: resolve(__dirname, 'maps/index.html'),
        enlowtunneltextured: resolve(__dirname, 'maps/enlowtunneltextured/index.html'),
        enlowtunnelmeshlabpc: resolve(__dirname, 'maps/enlowtunnelmeshlabpc/index.html'),
        TheCave: resolve(__dirname, 'maps/TheCave/index.html'),
        tunnelquestionmark: resolve(__dirname, 'maps/tunnelquestionmark/index.html'),
        desksetup437: resolve(__dirname, 'maps/desksetup437/index.html'),
        DiulusHallway: resolve(__dirname, 'maps/DiulusHallway/index.html'),
        BEH4HallwayBE: resolve(__dirname, 'maps/BEH4HallwayBE/index.html'),
        Floor4Benedum: resolve(__dirname, 'maps/Floor4Benedum/index.html'),
        Floor4BenedumLE: resolve(__dirname, 'maps/Floor4BenedumLE/index.html'),
        Floor4BenedumLEmeh: resolve(__dirname, 'maps/Floor4BenedumLEmeh/index.html'),
      },
    },
  },
})