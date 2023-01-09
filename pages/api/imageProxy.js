// pages/api/imageProxy.ts

import { withImageProxy } from "@blazity/next-image-proxy";

export default withImageProxy({
  whitelistedPatterns: [
    /^http?:\/\/(.*)/,
    /^https?:\/\/(.*)/,
    /^https?:\/\/(.*).spotifycdn.com/,
    /^https?:\/\/(.*).spotifycdn.co/,
    /^https?:\/\/(.*).scdn.com/,
    /^https?:\/\/(.*).scdn.co/,
  ],
});
