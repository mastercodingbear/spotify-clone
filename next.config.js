/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    CLIENT_ID:"8f64788e26c9441487c4934944f713d2",
    CLIENT_SECRET:"11d1f5c8a5b14cdd95bf86db6d8beb96"
  },
  
  images: {
    domains: [
      "i.scdn.co",
      "seed-mix-image.spotifycdn.com",
      "charts-images.scdn.co",
      "daily-mix.scdn.co",
      "mosaic.scdn.co",
      "thisis-images.scdn.co",
      "seeded-session-images.scdn.co",
      "newjams-images.scdn.co",
    ],
  },
};

module.exports = nextConfig;
