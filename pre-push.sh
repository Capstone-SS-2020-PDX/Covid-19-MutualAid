#!/bin/sh
cd django/tests
pytest -vvv

cd ../../react-native
npm run test
