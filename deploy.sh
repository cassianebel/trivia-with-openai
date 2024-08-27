#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Build the project
npm run build

# Check if the gh-pages branch exists locally
if git show-ref --quiet refs/heads/gh-pages; then
  # Delete the local gh-pages branch
  git branch -D gh-pages
fi

# Check if the gh-pages branch exists on the remote
if git ls-remote --exit-code --heads origin gh-pages; then
  # Delete the remote gh-pages branch
  git push origin --delete gh-pages
fi

# Deploy to GitHub Pages
npx gh-pages -d dist

# Create a new local gh-pages branch from the current branch
git checkout -b gh-pages

# Push the new gh-pages branch to the remote
git push origin gh-pages

# Switch back to the previous branch
git checkout -