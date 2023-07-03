/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'res.cloudinary.com', 
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      'www.graana.com',
      'cdn.pixabay.com'
    ]
  }
}

module.exports = nextConfig