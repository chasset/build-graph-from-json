'use strict';

import test from 'unit.js';
import { describe, it } from 'mocha';
import Graph from '../lib/index.js';

describe('pathName', () => {
  it('returns only root when path is empty', () => {
    const o = [];
    let g = new Graph({});
    const result = g.pathName(o);
    const expected = 'root'; 
    test.string(result).is(expected);
  });
  it('returns one node', () => {
    const o = [ 'a' ];
    let g = new Graph({});
    const result = g.pathName(o);
    const expected = 'root.a'; 
    test.string(result).is(expected);
  });
  it('returns more nodes', () => {
    const o = [ 'a', 'b', 'c' ];
    let g = new Graph({});
    const result = g.pathName(o);
    const expected = 'root.a.b.c'; 
    test.string(result).is(expected);
  });
  it('returns more nodes even with numbers', () => {
    const o = [ 'a', 'b', 'c', 1 ];
    let g = new Graph({});
    const result = g.pathName(o);
    const expected = 'root.a.b.c.1'; 
    test.string(result).is(expected);
  });
});
