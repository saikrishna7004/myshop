/** @type {import('next').NextConfig} */
const nextConfig = {
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
	}
}

module.exports = nextConfig
