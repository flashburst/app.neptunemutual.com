const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
const { i18n } = require('./i18n.config')
const http = require('./http')

/** @type {(phase) => import('next').NextConfig} */
const nextConfig = (phase) => {
  return {
    reactStrictMode: true,
    output: 'standalone',
    experimental: {
      swcPlugins: [
        ['@lingui/swc-plugin', {}]
      ]
    },
    eslint: {
      dirs: ['http', 'lib', 'src']
    },
    headers: async () => {
      if (phase === PHASE_DEVELOPMENT_SERVER) {
        return http.headers.development
      }

      return http.headers.production
    },
    i18n
    // webpack: (config) => {
    //   config.module.rules.push({
    //     test: /\.po/,
    //     use: ['@lingui/loader']
    //   })

    //   return config
    // }
  }
}

module.exports = nextConfig
