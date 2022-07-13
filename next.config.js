/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');

const nextConfig = withPWA({
	images: {
		domains: ['localhost'],
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
		skipWaiting: true
	},
	reactStrictMode: true
})

module.exports = nextConfig
