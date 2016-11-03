'use strict';

var _unit = require('unit.js');

var _unit2 = _interopRequireDefault(_unit);

var _mocha = require('mocha');

var _index = require('../lib/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('pathName', function () {
  (0, _mocha.it)('returns only root when path is empty', function () {
    var o = [];
    var g = new _index2.default({});
    var result = g.pathName(o);
    var expected = 'root';
    _unit2.default.string(result).is(expected);
  });
  (0, _mocha.it)('returns one node', function () {
    var o = ['a'];
    var g = new _index2.default({});
    var result = g.pathName(o);
    var expected = 'root.a';
    _unit2.default.string(result).is(expected);
  });
  (0, _mocha.it)('returns more nodes', function () {
    var o = ['a', 'b', 'c'];
    var g = new _index2.default({});
    var result = g.pathName(o);
    var expected = 'root.a.b.c';
    _unit2.default.string(result).is(expected);
  });
  (0, _mocha.it)('returns more nodes even with numbers', function () {
    var o = ['a', 'b', 'c', 1];
    var g = new _index2.default({});
    var result = g.pathName(o);
    var expected = 'root.a.b.c.1';
    _unit2.default.string(result).is(expected);
  });
});