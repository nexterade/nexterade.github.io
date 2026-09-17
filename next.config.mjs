const isGithubActions = Boolean(process.env.GITHUB_ACTIONS);
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] || "";
const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH || (isGithubActions && repoName ? `/${repoName}` : "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  basePath: configuredBasePath,
  assetPrefix: configuredBasePath || undefined
};

export default nextConfig;
