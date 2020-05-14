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

### Set Up Git Pre-push hook!
In order for automatic `pytest` and `jest` and Postman suites to run before `git push` please run the following in the root of the repo:

`ln -s pre-push.sh .git/hooks/pre-push`

This will ensure that the `pre-push.sh` script actually runs before a push.
You will need to install pytest, jest and newman locally as well.

`pip install pytest`

`npm install --save-dev jest`

`npm install -g newman`

## Deploy and Test
Pending an awesome Makefile :)

## Team
### Project Lead
- Erik Haake

### Project members
- Sean Sisson
- Michael Jenkins
- Allie Hanson
- Simon Barton
- Roland Ballinger