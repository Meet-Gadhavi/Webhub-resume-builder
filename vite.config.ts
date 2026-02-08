import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load all environment variables regardless of VITE_ prefix
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Properly stringify the env object to prevent syntax errors in the build
      'process.env': JSON.stringify(env)
    }
  };
});