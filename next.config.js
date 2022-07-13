/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');

const nextConfig = withPWA({
	images: {
		domains: ['localhost', 'saikrishna1.ddns.net'],
	},
	i18n: {
		locales: ["en"],
		defaultLocale: "en",
	},
	env: {
		URL: process.env.URL,
	},
	pwa: {
		dest: 'public',
		register: true,
		skipWaiting: true,
		mode: 'production'
	},
	reactStrictMode: true
})

module.exports = nextConfig
