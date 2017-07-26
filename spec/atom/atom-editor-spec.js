'use babel';

import AtomEditor from '../../lib/atom/atom-editor';

describe('Path', () => {

  describe('the constructor', () => {

    beforeEach(() => {
      waitsForPromise(() => {
        return atom.workspace.open('c.coffee');
      });
    });

    it('cannot work with nulls or undefineds', () => {
      
    });
  });

});
