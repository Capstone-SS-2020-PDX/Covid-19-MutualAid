# Covid-19: MutualAid

## Introduction
This is a community organization application that allows users to give goods
to those who are geographically close to them, as well as make requests for goods.
There is no opportunity for profiteering on this platform. All items are exchanged out of goodwill.

## Initial local Setup

#### Install dependencies: 

For Linux bash scripts exist to automatically install dependencies.

Run `make install` in the root of the repo, follow the instructions then run `make install2`


#### Testing
All testing is performed manually with emulators and browsers during our rapid development phase.

#### Deploy and Test
Deployment is handled by our development team.

Several make commands are available to run in the root of the repo.

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