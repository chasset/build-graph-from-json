'use strict';

var _unit = require('unit.js');

var _unit2 = _interopRequireDefault(_unit);

var _mocha = require('mocha');

var _index = require('../lib/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('jsonToGraph', function () {

  (0, _mocha.it)('returns a void graph when json is empty', function () {
    var g = new _index2.default({});
    var input = {};
    g.jsonToGraph(input);
    _unit2.default.object(g.nodes).is({
      root: {
        label: 'root',
        seen: 1
      }
    }).object(g.edges).is({});
  });

  (0, _mocha.it)('returns a small graph when json is small', function () {
    var g = new _index2.default({});
    var input = { a: 'blabla' };
    g.jsonToGraph(input);
    _unit2.default.object(g.nodes).is({
      root: {
        label: 'root',
        seen: 1
      },
      'root.a': {
        label: 'a',
        seen: 1
      }
    }).object(g.edges).is({
      'root->root.a': {
        source: 'root',
        target: 'root.a',
        seen: 1
      }
    });
  });

  (0, _mocha.it)('returns a graph with incremented values when read twice', function () {
    var g = new _index2.default({});
    var input = { a: 'blabla' };
    g.jsonToGraph(input);
    g.jsonToGraph(input);
    _unit2.default.object(g.nodes).is({
      root: {
        label: 'root',
        seen: 2
      },
      'root.a': {
        label: 'a',
        seen: 2
      }
    }).object(g.edges).is({
      'root->root.a': {
        source: 'root',
        target: 'root.a',
        seen: 2
      }
    });
  });

  (0, _mocha.it)('returns a graph with incremented values when it reads two different graphs', function () {
    var g = new _index2.default({});
    var input = { a: 'blabla' };
    g.jsonToGraph(input);
    var input2 = { b: 'tsss' };
    g.jsonToGraph(input2);
    _unit2.default.object(g.nodes).is({
      root: {
        label: 'root',
        seen: 2
      },
      'root.a': {
        label: 'a',
        seen: 1
      },
      'root.b': {
        label: 'b',
        seen: 1
      }
    }).object(g.edges).is({
      'root->root.a': {
        source: 'root',
        target: 'root.a',
        seen: 1
      },
      'root->root.b': {
        source: 'root',
        target: 'root.b',
        seen: 1
      }
    });
  });

  (0, _mocha.it)('can read multilevel graph', function () {
    var g = new _index2.default({});
    var input = { a: { c: 'blabla', d: 12 } };
    g.jsonToGraph(input);
    _unit2.default.object(g.nodes).is({
      root: {
        label: 'root',
        seen: 1
      },
      'root.a': {
        label: 'a',
        seen: 1
      },
      'root.a.c': {
        label: 'c',
        seen: 1
      },
      'root.a.d': {
        label: 'd',
        seen: 1
      }
    }).object(g.edges).is({
      'root->root.a': {
        source: 'root',
        target: 'root.a',
        seen: 1
      },
      'root.a->root.a.c': {
        source: 'root.a',
        target: 'root.a.c',
        seen: 1
      },
      'root.a->root.a.d': {
        source: 'root.a',
        target: 'root.a.d',
        seen: 1
      }
    });
  });

  (0, _mocha.it)('can increment even on multilevel graph', function () {
    var g = new _index2.default({});
    var input = { a: { c: 'blabla', d: 12 } };
    var input2 = { a: { z: 3, d: 'eheh' }, c: 'duplicate' };
    g.jsonToGraph(input);
    g.jsonToGraph(input2);
    _unit2.default.object(g.nodes).is({
      root: {
        label: 'root',
        seen: 2
      },
      'root.a': {
        label: 'a',
        seen: 2
      },
      'root.a.c': {
        label: 'c',
        seen: 1
      },
      'root.a.z': {
        label: 'z',
        seen: 1
      },
      'root.a.d': {
        label: 'd',
        seen: 2
      },
      'root.c': {
        label: 'c',
        seen: 1
      }
    }).object(g.edges).is({
      'root->root.a': {
        source: 'root',
        target: 'root.a',
        seen: 2
      },
      'root->root.c': {
        source: 'root',
        target: 'root.c',
        seen: 1
      },
      'root.a->root.a.c': {
        source: 'root.a',
        target: 'root.a.c',
        seen: 1
      },
      'root.a->root.a.z': {
        source: 'root.a',
        target: 'root.a.z',
        seen: 1
      },
      'root.a->root.a.d': {
        source: 'root.a',
        target: 'root.a.d',
        seen: 2
      }
    });
  });
});