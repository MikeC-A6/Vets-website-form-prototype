#!/bin/bash

# Use APP_NAME environment variable or default to spruce-challenge-app
APP_NAME=${APP_NAME:-spruce-challenge-app}

# make our app change to content-build/src/applications/registry.json
cp /application/script/${APP_NAME}-registry.json /content-build/src/applications/registry.json
yarn install
yarn build --entry=${APP_NAME}
yarn mock-api --responses src/applications/${APP_NAME}-app/mocks/index.js &
yarn watch --env entry=${APP_NAME}