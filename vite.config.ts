import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default ({ mode }) => {
  //This allows us to access environment variables below.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    base: '',
    plugins: [react(), viteTsconfigPaths()],
    server: {
      // this ensures that the browser opens upon server start
      open: true,
      // this sets a default port to 3000
      port: parseInt(process.env.VITE_APP_PORT),
    },
  });
};
