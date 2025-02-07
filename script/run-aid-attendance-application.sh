#!/bin/bash

# Start the mock API server
node src/platform/testing/e2e/mockapi.js --responses src/applications/aid-attendance-app/mocks/index.js &

# Start the webpack dev server with the correct entry name
node ./script/watch.js --env entry=aid-attendance 