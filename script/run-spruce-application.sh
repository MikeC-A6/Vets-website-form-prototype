#!/bin/bash

# make our spruce change to content-build/src/applications/registry.json
cp /application/script/spruce-application-registry.json /content-build/src/applications/registry.json
yarn install
yarn build --entry=spruce-challenge-app
yarn mock-api --responses src/applications/spruce-challenge-app/mocks/index.js &
yarn --cwd $( git rev-parse --show-toplevel ) watch --env entry=spruce-challenge-app