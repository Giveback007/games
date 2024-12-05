import { defineConfig } from 'vite';
import { networkInterfaces } from "os";
import { join } from 'path';

export const joinToRoot = (...path: string[]) => join(import.meta.dirname || '/', '..', ...path);

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

export default defineConfig(({ mode }) => ({
	root: 'src', // Set /src as the root
	server: {
		host: useRemoteDebugging ? true : undefined,
	},
	build: {
		outDir: '../dist',
	},
	define: {
		'process.env.API_DEV_URL': JSON.stringify(
			mode === 'development' && useRemoteDebugging ? `http://${localIp}:8000` : `http://localhost:8000`
		),
		'process.env.IS_DEV': mode === 'development',
	}
}));
