/** @type {import('next').NextConfig} */
const nextConfig = {
  
  // Configuração de imagens atualizada para o padrão recomendado
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  // Ignora erros de ESLint durante o processo de build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Ignora erros de TypeScript durante o processo de build
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;