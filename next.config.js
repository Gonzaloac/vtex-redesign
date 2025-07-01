/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Asegurarse de que Next.js maneje correctamente los archivos estáticos
  images: {
    domains: ['localhost'],
    unoptimized: process.env.NODE_ENV !== 'production',
  },
  // Configuración para manejar errores de forma más robusta
  onDemandEntries: {
    // Período (en ms) donde las páginas compiladas se mantendrán en memoria
    maxInactiveAge: 60 * 1000,
    // Número de páginas que se mantendrán en memoria
    pagesBufferLength: 5,
  },
  // Configuración para el manejo de errores
  experimental: {
    // Next.js 15.3.3 no longer uses these options
    // runtime and serverComponents have been removed
  },
  // Asegurarse de que los archivos estáticos se sirvan correctamente
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : '',
  // Configuración para el manejo de errores en producción
  productionBrowserSourceMaps: true,
}

module.exports = nextConfig
