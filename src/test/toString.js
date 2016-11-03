'use strict';

import test from 'unit.js';
import { describe, it } from 'mocha';
import Graph from '../lib/index.js';

let g = new Graph({});
const input = { a: { c:'blabla', d: 12 }};
const input2 = { a: { z: 3, d: 'eheh'}, c: 'duplicate' };
g.jsonToGraph(input);
g.jsonToGraph(input2);

const nodesText = `id;label;seen
root;root;2
root.a;a;2
root.a.c;c;1
root.a.d;d;2
root.a.z;z;1
root.c;c;1
`;

const edgesText = `o;d;seen
root;root.a;2
root;root.c;1
root.a;root.a.c;1
root.a;root.a.d;2
root.a;root.a.z;1
`;

describe('nodesToString', () => {

  it('returns the csv file', () => {
    test
      .string(g.nodesToString())
        .is(nodesText)
    ;
  });
});

describe('edgesToString', () => {
  it('returns the csv file', () => {
    test
      .string(g.edgesToString())
        .is(edgesText)
    ;
  });
});
