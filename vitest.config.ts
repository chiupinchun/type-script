/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/e2e/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,playwright,tsup,build}.config.*'
    ]
  },
})