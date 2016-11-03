'use strict';

import 'babel-polyfill';
import traverse from 'traverse';
import fs from 'fs';

export default class Graph {

  constructor({ root, edgeSep, pathSep, fileSep, nodesFileName, edgesFileName }) {
    this.nodesFileName = nodesFileName || 'nodes.csv';
    this.edgesFileName = edgesFileName || 'edges.csv';
    this.edgeSep = edgeSep || '->';
    this.pathSep = pathSep || '.';
    this.fileSep = fileSep || ';';
    this.root = root || 'root';
    this.nodes = {};
    this.edges = {};
  }

  pathName(path) {
    return path.length == 0 ? this.root : this.root + this.pathSep + path.join(this.pathSep);
  }

  createNode(id, key) {
    this.nodes[id] = {
      label: key ? key : this.root,
      seen: 1,
    };
  }

  updateNode(id) {
    this.nodes[id].seen += 1;
  }

  addNode(id, key) {
    if ( this.nodes.hasOwnProperty(id) ) {
      this.updateNode(id);
    } else {
      this.createNode(id, key);
    }
  }

  addEdge(o, d) {
    const id = o + this.edgeSep + d;    
    if ( this.edges.hasOwnProperty(id) ) {
      this.updateEdge(id);
    } else {
      this.createEdge(id, o, d);
    }
  }

  createEdge(id, o, d) {
    this.edges[id] = {
      source: o,
      target: d,
      seen: 1,
    };
  }

  updateEdge(id) {
    this.edges[id].seen += 1;
  }

  jsonToGraph(json) {
    const g = this;
    traverse(json).forEach( function() {
      let path = this.path;
      const key = this.key;
      const d = g.pathName(path);
      g.addNode(d, key);
      if ( path.length > 0 ) {
        path.pop();
        const o = g.pathName(path);
        g.addEdge(o, d);
      }
    });
  }

  toString() {
    return this.graphToString();
  }

  graphToString() {
    let text = `--Nodes\n`;
    text += this.nodesToString();
    text += `--Edges\n`;
    text += this.edgesToString();
    return text;
  }

  nodesToString() {
    let text = ['id', 'label', 'seen'].join(this.fileSep) + `\n`;
    for (const id of Object.keys(this.nodes).sort() ) 
      text += [ id, this.nodes[id].label, this.nodes[id].seen ].join(this.fileSep) + `\n`;
    return text;
  }

  edgesToString() {
    let text = ['o', 'd', 'seen'].join(this.fileSep) + `\n`;
    for (const id of Object.keys(this.edges).sort() ) 
      text += [ this.edges[id].source, this.edges[id].target, this.edges[id].seen ].join(this.fileSep) + `\n`;
    return text;
  }

  exportGraphToFile() {
    fs.writeFile(this.nodesFileName, this.nodesToString(), (error) => { if(error) throw new Error(error); });
    fs.writeFile(this.edgesFileName, this.edgesToString(), (error) => { if(error) throw new Error(error); });
  }

}
