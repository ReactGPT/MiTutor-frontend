import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createProxyMiddleware } from 'http-proxy-middleware';

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   // server : {
//   //   hmr:false
//   // }
//   server: {
//     port: 5173, // Ajusta el puerto según tus necesidades
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5173', // Ajusta la URL del backend
//         changeOrigin: true,
//         configure: (proxy, options) => {
//           proxy.on('proxyReq', (proxyReq) => {
//             // Si es necesario, ajusta el tamaño del encabezado aquí
//             proxyReq.setHeader('Content-Length', Buffer.byteLength(proxyReq.body));
//           });
//         },
//         onProxyReq: (proxyReq) => {
//           // Ajusta el tamaño del header aquí si es necesario
//           proxyReq.setHeader('Content-Length', '0'); // Esto puede ser ajustado según tus necesidades
//         }
//       }
//     }
//   }
// });

// Export the Vite configuration
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Ajusta el puerto según tus necesidades
    proxy: {
      '/api': {
        target: 'http://localhost:5173', // Ajusta la URL del backend
        changeOrigin: true,
      }
    }
  }
});
