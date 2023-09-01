#!/bin/bash

# Deploy and set up Shopify app
echo "Deploying and setting up the Shopify app..."
# Run commands to deploy your app (e.g., clone the repository, install dependencies)

# Simulate responses to the setup questions
{
  echo "RP Store"                   # Partners organization
  echo "y"                          # Create as new app
  echo "form-builder (shopify.app.form-builder.toml)"   # Existing app (if applicable)
  echo "y"                          # Automatically update app's URL
} | npm run dev            # Run the app setup

# Capture the setup output
app_output=$(npm run dev)

# Extract the API key and host key from the setup output
api_key=$(echo "$app_output" | grep -oP 'API Key: \K(.+)')
host_key=$(echo "$app_output" | grep -oP 'Host Key: \K(.+)')

# Set the API key and host as environment variables for the build
echo "REACT_APP_SHOPIFY_API_KEY=$api_key" >> .env
echo "REACT_APP_SHOPIFY_HOST=$host_key" >> .env

# Run the build command
vite build