import { defineConfig } from 'vite';
import { networkInterfaces } from "os";

/* Enable this to allow debugging with devices on same network */
const useRemoteDebugging = true;

const localIp = useRemoteDebugging ? (() => {
	const interfaces = networkInterfaces();
	for (const devName in interfaces) {
		const iface = interfaces[devName] || [];
		for (let i = 0; i < iface.length; i++) {
			const alias = iface[i];
			if (
				alias?.family === 'IPv4'
				&&
				alias.address !== '127.0.0.1'
				&&
			!alias.internal) return alias.address;
		}
	}

	return '0.0.0.0'; // Fallback to all interfaces if no specific IP is found
})() : 'localhost';

export default defineConfig({
  root: 'src', // Set /src as the root
  server: {
		host: useRemoteDebugging ? true : undefined,
	},
  build: {
    outDir: '../dist', // Specify output directory relative to root
  },
  define: {
		'process.env.API_URL': useRemoteDebugging ? JSON.stringify(`http://${localIp}:8000`) : null
	}
});
