#!/usr/bin/env sh

# Abort the script if any command fails
set -e

echo "🚀 Building Visceral Current for production..."
npm run build

echo "📂 Navigating to the build directory..."
cd dist

# Bypass GitHub Pages default Jekyll processing (important for Vite)
echo > .nojekyll

# IMPORTANT: If using a custom domain, uncomment the line below and replace the domain!
# This ensures GitHub Pages doesn't reset your custom domain on every deployment.
# echo 'www.yourdomain.com' > CNAME

echo "⚙️ Initializing temporary Git repository..."
git init
git checkout -B main
git add -A
git commit -m 'deploy: update architecture'

echo "🛰️ Pushing to GitHub Pages..."
# TODO: Replace <USERNAME> and <REPO> below with your GitHub details!
# Example: git@github.com:chrisvanhouten/visceral-current.git
git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages

cd -
echo "✅ Deployment complete! The Codex is live."