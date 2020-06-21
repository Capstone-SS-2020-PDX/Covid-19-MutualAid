# Covid-19: MutualAid

## Introduction
This is a community organization application that allows users to give goods
to those who are geographically close to them, as well as make requests for goods.
There is no opportunity for profiteering on this platform. All items are exchanged out of goodwill.

## Initial local Setup

#### Install dependencies: 

For Linux bash scripts exist to automatically install dependencies.

Run `make install` in the root of the repo, follow the instructions then run `make install2`


#### Set Up Git Pre-push hook!
In order for automatic `pytest` and `jest` and Postman suites to run before `git push` please run the following in the root of the repo:

`ln -s pre-push.sh .git/hooks/pre-push`

This will ensure that the `pre-push.sh` script actually runs before a push.
You will need to install pytest, jest and newman locally as well.

#### Deploy and Test
Deployment is handled by our development team.

`make server` will run local postgres and django docker containers.
`make js` will run the expo emulator locally. This is configured to point to our deployed API by default.

## Team
### Project Lead
- Erik Haake

### Project members
- Sean Sisson
- Michael Jenkins
- Allie Hanson
- Simon Barton
- Roland Ballinger