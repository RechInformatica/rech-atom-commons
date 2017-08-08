'use babel';

import AtomEditor from '../../lib/atom/atom-editor';

describe('Path', () => {
  describe('the setCursor method', () => {
    let editor;
    beforeEach(() => {
      waitsForPromise(() => {
        return atom.workspace.open().then(() => {
          editor = new AtomEditor();
          atom.workspace.getActiveTextEditor().insertText("Line 1\nLine 2\nLine 3");
        });
      });
    });

    it('ignores undefined', () => {
      editor.setCursor(1);
      editor.setCursor(undefined);
      expect(editor.getCurrentRow()).toBe(1);
    });
    it('works passing rows', () => {
      editor.setCursor(0);
      expect(editor.getCurrentRow()).toBe(0);
      editor.setCursor(1);
      expect(editor.getCurrentRow()).toBe(1);
      editor.setCursor(2);
      expect(editor.getCurrentRow()).toBe(2);
    });

    it('goes to the closest position if the passed position is invalid', () => {
      editor.setCursor(-1);
      expect(editor.getCurrentRow()).toBe(0);
      editor.setCursor(5);
      expect(editor.getCurrentRow()).toBe(2);
    });
  });

});
