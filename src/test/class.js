'use strict';

import test from 'unit.js';
import { describe, it } from 'mocha';
import Graph from '../lib/index.js';

describe('Class Graph', () => {

  it('returns an object on creation', () => {
    let g = new Graph({});
    test.object(g);
  });

});
