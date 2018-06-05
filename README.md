# Node Typescript Rest-API (Scrapper)
[![Build Status](https://travis-ci.org/vip-git/node-rest-api-scrapper.svg?branch=master)](https://travis-ci.org/vip-git/node-rest-api-scrapper) [![npm version](https://badge.fury.io/js/npm.svg)](https://badge.fury.io/js/npm) [![dependencies](https://david-dm.org/vip-git/node-rest-api-scrapper.svg)](https://david-dm.org/vip-git/node-rest-api-scrapper) [![dev-dependencies](https://david-dm.org/vip-git/node-rest-api-scrapper/dev-status.svg)](https://david-dm.org/vip-git/node-rest-api-scrapper)
#### (ts-express-decorators) (express-http-proxy) (jest) (typedoc)
------------------------------
## DOCS
- https://vip-git.github.io/node-rest-api-scrapper/index.html
### Prerequisites
- [MongoDB](https://www.mongodb.org/downloads)
- [Node.js 8.0+](http://nodejs.org)


### Getting Started
```
npm install

npm start (Please make sure mongoDB is running in background on port 27017)


Navigate: (Requires you to set headers: `Authorization Bearer AbCdEf123456`)
- http://localhost:3000/api/show (API)
- http://localhost:3000/proxy/show (PROXY - NO headers required for now)
- http://localhost:3000/api-docs/ (Swagger UI)
```
