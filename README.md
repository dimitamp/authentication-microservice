# Authentication Microservice

A microservice that provides authentication / authorization features.

[![CircleCI](https://circleci.com/gh/dimitamp/authentication-microservice/tree/master.svg?style=svg&circle-token=6a257ad3c2af50566291f4d1f618127dfc3e7b28)](https://circleci.com/gh/dimitamp/authentication-microservice)
[![codecov](https://codecov.io/gh/dimitamp/authentication-microservice/branch/master/graph/badge.svg?token=Fc3HHwj5VH)](https://codecov.io/gh/dimitamp/authentication-microservice)
[![license](https://img.shields.io/github/license/dimitamp/authentication-microservice.svg)](./LICENSE)
## Try it out
 [Demo](http://83.212.107.194:5000)

## Documentation 
  [Read more](http://83.212.107.194:5000/docs)

## Quick Start

- Install dependencies:

```bash
$ npm i
```

- Create .env file based on [.env.sample](./.env.sample)

- Configure microservice [constants](./src/utilities/validation/constants.js) based on your needs

## Development

```bash
$ npm run dev
```

## Production

```bash.
$ npm start
```

## Test

```bash
$ npm run lint
$ npm run cover
$ npm test




```
