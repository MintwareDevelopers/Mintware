import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'metadata.ens.domains' },
      { protocol: 'https', hostname: '*.ens.xyz' },
      { protocol: 'https', hostname: 'avatars.joepegs.com' },
      { protocol: 'https', hostname: '**.ipfs.nftstorage.link' },
    ],
  },
};

export default nextConfig;
