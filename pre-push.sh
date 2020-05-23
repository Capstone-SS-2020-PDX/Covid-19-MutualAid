#!/bin/sh

set -x

# Python unit test
# Start local django / db in background, give it time to start
# JS unit test
# Run Postman tests against local django (new code)
# Kill docker containers in background

cd django/tests && pytest -vvv \
&& cd ../.. && (make server > /dev/null 2>&1 &) \
&& sleep 5 \
&& cd react-native && npm run test \
&& cd ../qa && newman run suite.postman_collection.json \
&& docker ps -a -q
