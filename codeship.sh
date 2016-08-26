#!/usr/bin/env bash

# This is for use on Codeship.
# It simply runs the tests against all LTS/maintenance versions of NodeJS.


NODEJS_VERSIONS=('v0.10' 'v0.12' 'v4' 'v6');

for NODEJS_VERSION in "${NODEJS_VERSIONS[@]}"
do
  # This can be removed when we're not testing NodeJS < v3.7.0
  # https://github.com/npm/npm/blob/master/CHANGELOG.md#more-performant
  npm set progress=false
  nvm use ${NODEJS_VERSION}
  npm install
  npm test
done
