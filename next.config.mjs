/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Ensure that the base path is correct for GitHub Pages
  // Base path should be the repo name if not a custom domain
  // But since it's saurabhkumar1432.github.io, base path is empty
  basePath: '',
};

export default nextConfig;
