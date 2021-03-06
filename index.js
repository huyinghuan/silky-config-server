'use strict';
const _express = require("express");
const _routeMap = require('./router');
let _Waterpit = require('water-pit').Waterpit;

const app = _express();
const router = _express.Router();

const water = new _Waterpit(router, _routeMap);

app.use('/', router)

console.log('silky config server run in ' + 18866)

app.listen(18866)