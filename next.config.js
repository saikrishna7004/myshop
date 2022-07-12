/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');

const nextConfig = withPWA({
	reactStrictMode: true,
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
		disable: process.env.NODE_ENV === 'development',
	},
	reactStrictMode: true
})

module.exports = nextConfig
