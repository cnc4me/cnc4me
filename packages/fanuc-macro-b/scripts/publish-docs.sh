#!/bin/bash

# Stash current work
git stash save "Auto stash before publishing docs"

# Checkout gh-pages branch
git checkout gh-pages

# Run typedoc
typedoc --out docs src

# Add and commit the docs folder
git add docs
git commit -m "Update documentation"

# Push the changes to gh-pages branch
git push origin gh-pages

# Checkout back to the previous branch
git checkout -

# Apply the stashed work
git stash pop
