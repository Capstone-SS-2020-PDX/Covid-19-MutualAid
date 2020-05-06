# Covid-19: MutualAid

## Introduction
This is a community organization application that allows users to give goods
to those who are geographically close to them, as well as make requests for goods.
There is no opportunity for profiteering on this platform. All items are exchanged out of goodwill.

## Initial local Setup

Clone repo

#### Install dependencies: 

For Linux just replace `brew install` or `brew cask install` with `sudo apt-get install`

For Windows, I'm not entirely sure yet.

On a Mac, for django run:
- `brew install postgresql`
- `brew cask install docker`
- On Mac actually open the 'Docker' app in applications folder, you'll see little whale in the menu bar at top after
  - On Linux, you want to get dockerd running so that you at least get the empty column result from `docker ps`
    - I forget some of the misc stuff I had to do, I can help here if necessary.
- `brew install docker-compose`
  
For react native run:
- `brew install yarn`
- `npm install --global expo-cli`
- `yarn add expo`

#### Run django and expo

Django:
- In the root of the repo with the .yml file, run `docker-compose up`
  - This should create two local docker containers, one django one postgres
    - Subsequent `docker-compose` will be much faster
  - With the containers running, check out `http://localhost/api/ask/`
    - Even if you got errors from Django, it's still talking to django!

React Native simulator:
- In repo folder `/react-native`, run `expo start`
  - If you haven't already download the Expo app on your phone then point your camera at the QR code
  - Or hit W to get a Web preview

Observe that REST requests aren't fully communicating between the two (Network error in app simulator),

- but you can manually send a POST with body {"title":"Some item"} to http://localhost/api/ask/
  - Django container listening on port 80 (0.0.0.0:80->80/tcp)
- GET should work as well
- I couldn't quite figure out how to migrate the django instance on a new setupk tho...

## Deploy and Test

Local test ideas:
- runs `jest` and `pytest` suites
  - Upon commit or just upon push?
- Postman, expo
- Code review

For long term CI:
- Biggest question in my mind is DBs.
  - Do we want just one persistent DB w/ rolling backups?

Backend rough idea:
- pull request opens
  1. Typical `jest` and `pytest` run against code locally (automatic git hook)
  2. At the same time, django docker instance made on GCP
  3. GCP psql instance made? (or connect to static instance w/ known data?)
  4. run a postman suite of tests (GitHub - Postman integration, automatically run a Postman "collection")
  5. keep instances up for a bit manual poking purposes
- pull request is updated indicating postman tests pass
- either merge or repeat upon subsequent `git push`

Frontend rough idea:
- pull request opens
  1. `jest` and `pytest` run against code locally
  2. run a [detox](https://github.com/wix/Detox) automated GUI sanity test suite (locally?)
   - Not sure if this one can alert the GitHub pull request, or if dev would need to comment
  3. expo available for team to test during review
- either merge or repeat upon subsequent `git push`

## Team
### Project Lead
- Erik Haake

### Project members
- Sean Sisson
- Michael Jenkins
- Allie Hanson
- Simon Barton
- Roland Ballinger


Simon todo

TODO: Figure out how to setup docker, docker-compose, yarn, npm on Windows

TODO: read more about [detox](https://github.com/wix/Detox/blob/master/docs/Guide.RunningOnCI.md)

TODO: Look into [Travis CI](https://travis-ci.org/) maybe
