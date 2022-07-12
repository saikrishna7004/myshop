/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache')

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
		runtimeCaching,
	},
	reactStrictMode: true
})

module.exports = nextConfig
