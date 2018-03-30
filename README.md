# Poliwag

[![Build Status](https://travis-ci.org/Panepo/Poliwag.svg?branch=master)](https://travis-ci.org/Panepo/Poliwag.svg)

## Requirements
* node `^5.0.0`
* npm `^3.0.0`

## Getting Start

1. Clone source code
```
$ git clone https://github.com/Panepo/Poliwag.git
```
2. Install dependencies
```
$ cd Poliwag
$ npm install
```
3. Start development server and visit [http://localhost:3000/](http://localhost:3000/)
```
$ npm run start
```
## Testing

To add a unit test, create a `.spec.js` file anywhere inside of `./tests`. Karma and webpack will automatically find these files, and Mocha and Chai will be available within your test without the need to import them.

## Production

Build code before deployment by running `npm run build`.
