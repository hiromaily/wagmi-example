/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fix `SyntaxError: Cannot use import statement outside a module` and
  //  `SyntaxError: Unexpected token 'export'`
  transpilePackages: [
    "@wagmi",
    "wagmi",
    "viem",
    "abitype",
    "@adraffy",
    "@tanstack",
    "@coinbase",
    "@walletconnect",
    "detect-browser",
  ],
};

module.exports = nextConfig;