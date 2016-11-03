'use strict';

var _unit = require('unit.js');

var _unit2 = _interopRequireDefault(_unit);

var _mocha = require('mocha');

var _index = require('../lib/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('Class Graph', function () {

  (0, _mocha.it)('returns an object on creation', function () {
    var g = new _index2.default({});
    _unit2.default.object(g);
  });
});