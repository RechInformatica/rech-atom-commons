'use babel';

import AtomEditor from '../../lib/atom/atom-editor';

describe('Path', () => {

  let editor;
  beforeEach(() => {
    waitsForPromise(() => {
      return atom.workspace.open().then(() => {
        editor = new AtomEditor();
        atom.workspace.getActiveTextEditor().insertText("Line 1\nLine 2\nLine 3\nText one in line one\nAnother text\nThis is fun!");
      });
    });
  });

  describe('the setCursor method', () => {

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

    it('works passing rows and cols', () => {
      editor.setCursor(0, 5);
      expect(editor.getCursor()).toEqual({row: 0, column: 5});
      editor.setCursor(2, 3);
      expect(editor.getCursor()).toEqual({row: 2, column: 3});
    });

    it('goes to the closest position if the passed position is invalid', () => {
      editor.setCursor(-1);
      expect(editor.getCurrentRow()).toBe(0);
      editor.setCursor(7);
      expect(editor.getCurrentRow()).toBe(5);
    });

    it('doesn\'t work with multiple cursors', () => {
      expect(() => editor.setCursor([{row: 1, column: 0}], [{row: 3, column: 3}])).toThrow(new Error("setCursor does not accept multiple cursors. Use setCursors instead"));
    });

  });

  describe('the setCursors method', () => {
    it('works passing objects', () => {
      editor.setCursors([{row: 0, column: 0}, {row: 1, column: 2}]);
      expect(editor.getCursors()).toEqual([{row: 0, column: 0}, {row: 1, column: 2}]);
      editor.setCursors([{row: 3, column: 5}, {row: 1, column: 2}, {row: 4, column: 0}]);
      expect(editor.getCursors()).toEqual([{row: 3, column: 5}, {row: 1, column: 2}, {row: 4, column: 0}]);
    });
  });

  describe('the getCurrentLine method', () => {
    it('Returns the current line (Text)', () => {
      editor.setCursor(0);
      expect(editor.getCurrentLine()).toBe("Line 1");
    });
  });

  describe('the getLine method', () => {
    it('Returns the line (Text)', () => {
      expect(editor.getLine(0)).toBe("Line 1");
      expect(editor.getLine(1)).toBe("Line 2");
      expect(editor.getLine(2)).toBe("Line 3");
      expect(editor.getLine(3)).toBe("Text one in line one");
    });
  });

  describe('the getCurrentWordBoundsList method', () => {
    it('selects words under a single cursor', () => {
      editor.setCursor(3);
       expect(editor.getCurrentWordBoundsList()).toEqual([{start: {row: 3, column: 0}, end: {row: 3, column: 4}}]);
      editor.setCursor(4);
      expect(editor.getCurrentWordBoundsList()).toEqual([{start: {row: 4, column: 0}, end: {row: 4, column: 7}}]);
      editor.setCursor(3, 5);
      expect(editor.getCurrentWordBoundsList()).toEqual([{start: {row: 3, column: 5}, end: {row: 3, column: 8}}]);
    });

    it('selects words under multiple cursors', () => {
      editor.setCursors([{row: 3, column: 0}, {row: 4, column: 0}, {row: 3, column: 5}]);
      expect(editor.getCurrentWordBoundsList()).toEqual([
        {start: {row: 3, column: 0}, end: {row: 3, column: 4}},
        {start: {row: 4, column: 0}, end: {row: 4, column: 7}},
        {start: {row: 3, column: 5}, end: {row: 3, column: 8}}
      ]);
    });

  });
});
