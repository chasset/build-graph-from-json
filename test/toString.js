'use strict';

var _unit = require('unit.js');

var _unit2 = _interopRequireDefault(_unit);

var _mocha = require('mocha');

var _index = require('../lib/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var g = new _index2.default({});
var input = { a: { c: 'blabla', d: 12 } };
var input2 = { a: { z: 3, d: 'eheh' }, c: 'duplicate' };
g.jsonToGraph(input);
g.jsonToGraph(input2);

var nodesText = 'id;label;seen\nroot;root;2\nroot.a;a;2\nroot.a.c;c;1\nroot.a.d;d;2\nroot.a.z;z;1\nroot.c;c;1\n';

var edgesText = 'o;d;seen\nroot;root.a;2\nroot;root.c;1\nroot.a;root.a.c;1\nroot.a;root.a.d;2\nroot.a;root.a.z;1\n';

(0, _mocha.describe)('nodesToString', function () {

  (0, _mocha.it)('returns the csv file', function () {
    _unit2.default.string(g.nodesToString()).is(nodesText);
  });
});

(0, _mocha.describe)('edgesToString', function () {
  (0, _mocha.it)('returns the csv file', function () {
    _unit2.default.string(g.edgesToString()).is(edgesText);
  });
});