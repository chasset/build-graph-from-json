'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

var _traverse = require('traverse');

var _traverse2 = _interopRequireDefault(_traverse);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Graph = function () {
  function Graph(_ref) {
    var root = _ref.root,
        edgeSep = _ref.edgeSep,
        pathSep = _ref.pathSep,
        fileSep = _ref.fileSep,
        nodesFileName = _ref.nodesFileName,
        edgesFileName = _ref.edgesFileName;

    _classCallCheck(this, Graph);

    this.nodesFileName = nodesFileName || 'nodes.csv';
    this.edgesFileName = edgesFileName || 'edges.csv';
    this.edgeSep = edgeSep || '->';
    this.pathSep = pathSep || '.';
    this.fileSep = fileSep || ';';
    this.root = root || 'root';
    this.nodes = {};
    this.edges = {};
  }

  _createClass(Graph, [{
    key: 'pathName',
    value: function pathName(path) {
      return path.length == 0 ? this.root : this.root + this.pathSep + path.join(this.pathSep);
    }
  }, {
    key: 'createNode',
    value: function createNode(id, key) {
      this.nodes[id] = {
        label: key ? key : this.root,
        seen: 1
      };
    }
  }, {
    key: 'updateNode',
    value: function updateNode(id) {
      this.nodes[id].seen += 1;
    }
  }, {
    key: 'addNode',
    value: function addNode(id, key) {
      if (this.nodes.hasOwnProperty(id)) {
        this.updateNode(id);
      } else {
        this.createNode(id, key);
      }
    }
  }, {
    key: 'addEdge',
    value: function addEdge(o, d) {
      var id = o + this.edgeSep + d;
      if (this.edges.hasOwnProperty(id)) {
        this.updateEdge(id);
      } else {
        this.createEdge(id, o, d);
      }
    }
  }, {
    key: 'createEdge',
    value: function createEdge(id, o, d) {
      this.edges[id] = {
        source: o,
        target: d,
        seen: 1
      };
    }
  }, {
    key: 'updateEdge',
    value: function updateEdge(id) {
      this.edges[id].seen += 1;
    }
  }, {
    key: 'jsonToGraph',
    value: function jsonToGraph(json) {
      var g = this;
      (0, _traverse2.default)(json).forEach(function () {
        var path = this.path;
        var key = this.key;
        var d = g.pathName(path);
        g.addNode(d, key);
        if (path.length > 0) {
          path.pop();
          var o = g.pathName(path);
          g.addEdge(o, d);
        }
      });
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.graphToString();
    }
  }, {
    key: 'graphToString',
    value: function graphToString() {
      var text = '--Nodes\n';
      text += this.nodesToString();
      text += '--Edges\n';
      text += this.edgesToString();
      return text;
    }
  }, {
    key: 'nodesToString',
    value: function nodesToString() {
      var text = ['id', 'label', 'seen'].join(this.fileSep) + '\n';
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(this.nodes).sort()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var id = _step.value;

          text += [id, this.nodes[id].label, this.nodes[id].seen].join(this.fileSep) + '\n';
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return text;
    }
  }, {
    key: 'edgesToString',
    value: function edgesToString() {
      var text = ['o', 'd', 'seen'].join(this.fileSep) + '\n';
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Object.keys(this.edges).sort()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var id = _step2.value;

          text += [this.edges[id].source, this.edges[id].target, this.edges[id].seen].join(this.fileSep) + '\n';
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return text;
    }
  }, {
    key: 'exportGraphToFile',
    value: function exportGraphToFile() {
      _fs2.default.writeFile(this.nodesFileName, this.nodesToString(), function (error) {
        if (error) throw new Error(error);
      });
      _fs2.default.writeFile(this.edgesFileName, this.edgesToString(), function (error) {
        if (error) throw new Error(error);
      });
    }
  }]);

  return Graph;
}();

exports.default = Graph;