'use strict';

import test from 'unit.js';
import { describe, it } from 'mocha';
import Graph from '../lib/index.js';

describe('jsonToGraph', () => {

  it('returns a void graph when json is empty', () => {
    let g = new Graph({});
    const input = {};
    g.jsonToGraph(input);
    test
      .object(g.nodes)
        .is({ 
          root: {
            label: 'root',
            seen: 1,
          }, 
        })
      .object(g.edges)
        .is({ 
        })
    ;
  });

  it('returns a small graph when json is small', () => {
    let g = new Graph({});
    const input = { a: 'blabla'};
    g.jsonToGraph(input);
    test
      .object(g.nodes)
        .is({ 
          root: {
            label: 'root',
            seen: 1,
          }, 
          'root.a': {
            label: 'a',
            seen: 1,
          },
        })
      .object(g.edges)
        .is({ 
          'root->root.a': { 
            source: 'root', 
            target: 'root.a',
            seen: 1,
          },
        })
    ;
  });

  it('returns a graph with incremented values when read twice', () => {
    let g = new Graph({});
    const input = { a: 'blabla'};
    g.jsonToGraph(input);
    g.jsonToGraph(input);
    test
      .object(g.nodes)
        .is({ 
          root: {
            label: 'root',
            seen: 2,
          }, 
          'root.a': {
            label: 'a',
            seen: 2,
          },
        })
      .object(g.edges)
        .is({ 
          'root->root.a': { 
            source: 'root', 
            target: 'root.a',
            seen: 2,
          },
        })
    ;
  });

  it('returns a graph with incremented values when it reads two different graphs', () => {
    let g = new Graph({});
    const input = { a: 'blabla'};
    g.jsonToGraph(input);
    const input2 = { b: 'tsss' };
    g.jsonToGraph(input2);
    test
      .object(g.nodes)
        .is({ 
          root: {
            label: 'root',
            seen: 2,
          }, 
          'root.a': {
            label: 'a',
            seen: 1,
          },
          'root.b': {
            label: 'b',
            seen: 1,
          },
        })
      .object(g.edges)
        .is({ 
          'root->root.a': { 
            source: 'root', 
            target: 'root.a',
            seen: 1,
          },
          'root->root.b': { 
            source: 'root', 
            target: 'root.b',
            seen: 1,
          },
        })
    ;
  });

  it('can read multilevel graph', () => {
    let g = new Graph({});
    const input = { a: { c:'blabla', d: 12 }};
    g.jsonToGraph(input);
    test
      .object(g.nodes)
        .is({ 
          root: {
            label: 'root',
            seen: 1,
          }, 
          'root.a': {
            label: 'a',
            seen: 1,
          },
          'root.a.c': {
            label: 'c',
            seen: 1,
          },
          'root.a.d': {
            label: 'd',
            seen: 1,
          },
        })
      .object(g.edges)
        .is({ 
          'root->root.a': { 
            source: 'root', 
            target: 'root.a',
            seen: 1,
          },
          'root.a->root.a.c': { 
            source: 'root.a', 
            target: 'root.a.c',
            seen: 1,
          },
          'root.a->root.a.d': { 
            source: 'root.a', 
            target: 'root.a.d',
            seen: 1,
          },
        })
      ;
  });

  it('can increment even on multilevel graph', () => {
    let g = new Graph({});
    const input = { a: { c:'blabla', d: 12 }};
    const input2 = { a: { z: 3, d: 'eheh'}, c: 'duplicate' };
    g.jsonToGraph(input);
    g.jsonToGraph(input2);
    test
      .object(g.nodes)
        .is({ 
          root: {
            label: 'root',
            seen: 2,
          }, 
          'root.a': {
            label: 'a',
            seen: 2,
          },
          'root.a.c': {
            label: 'c',
            seen: 1,
          },
          'root.a.z': {
            label: 'z',
            seen: 1,
          },
          'root.a.d': {
            label: 'd',
            seen: 2,
          },
          'root.c': {
            label: 'c',
            seen: 1,
          },
        })
      .object(g.edges)
        .is({ 
          'root->root.a': { 
            source: 'root', 
            target: 'root.a',
            seen: 2,
          },
          'root->root.c': { 
            source: 'root', 
            target: 'root.c',
            seen: 1,
          },
          'root.a->root.a.c': { 
            source: 'root.a', 
            target: 'root.a.c',
            seen: 1,
          },
          'root.a->root.a.z': { 
            source: 'root.a', 
            target: 'root.a.z',
            seen: 1,
          },
          'root.a->root.a.d': { 
            source: 'root.a', 
            target: 'root.a.d',
            seen: 2,
          },
        })
      ;
  });

});
