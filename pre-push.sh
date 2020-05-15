#!/bin/sh
cd django/tests
pytest -vvv

cd ../../react-native
npm run test

cd ../qa
newman run suite.postman_collection.json
