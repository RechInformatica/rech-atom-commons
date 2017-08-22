'use babel';
import WordFinder from '../word-finder';

/**
 * Class for accessing and manipulating the Atom editor
 */
export default class AtomEditor {

  constructor(textEditor = atom.workspace.getActiveTextEditor()) {
    this.textEditor = textEditor;
  }

  /**
   * Returns the absolute file name of the currently open file
   *
   * @return {string}
   */
  getPath() {
    return this.textEditor.getPath();
  }

  /**
   * Sets the cursor position
   *
   * @param {int} row
   * @param {int} column (Optional)
   */
  setCursor(row, column) {
    if (Array.isArray(row)) {
      throw new Error("setCursor does not accept multiple cursors. Use setCursors instead");
    }
    if (row == undefined) {
      return;
    }
    if (column == 0) {
      column = 0;
    }
    this.textEditor.setCursorBufferPosition([row, column]);
  }

  /**
   * Sets the cursors position (for multiple cursors)
   *
   * @param {array} cursorArray
   */
  setCursors(cursorArray) {
    cursorArray.forEach((cursor, index) => {
      if (index == 0) {
        this.textEditor.setCursorBufferPosition(cursor);
      } else {
        this.textEditor.addCursorAtBufferPosition(cursor);
      }
    });
  }

  /**
   * Returns the array of active cursors (Multie cursors)
   *
   * @return {array} of cursors (objects)
   */
  getCursors() {
    return this.textEditor.getCursorBufferPositions();
  }

  /**
   * Returns the current position of the cursor. If there are multiple cursors,
   * returns the first
   *
   * @return {object} row, column
   */
  getCursor() {
    return this.textEditor.getCursorBufferPosition();
  }

  /**
   * Returns the current selected row
   *
   * @return {int}
   */
  getCurrentRow() {
    return this.getCursor().row;
  }

  /**
   * Returns the current line content
   *
   * @return {string}
   */
  getCurrentLine() {
    return this.getLine(this.getCurrentRow());
  }

  /**
   * Returns the content of the rows that possess a cursor
   *
   * @return {string[]}
   */
  getCursorLines() {
    let lines = [];
    let positions = this.textEditor.getCursorBufferPositions();
    for (var i in positions) {
      let line = this.getLine(positions[i].row);
      lines.push(line);
    }
    return lines;
  }

  /**
   * Sets the selection
   */
  setSelection(selection) {
    this.textEditor.setSelectedBufferRanges(selection);
  }

  /**
   * Returns the line content
   *
   * @param {row} row index
   * @return {string}
   */
  getLine(row) {
    return this.textEditor.lineTextForBufferRow(row);
  }

  /**
   * Returns a list of bounds of the words under the cursors
   *
   * @return {array} of objects containing the start and end of words
   */
  getCurrentWordBoundsList() {
    let wordFinder = new WordFinder();
    let boundsList = [];
    this.getCursors().forEach(cursor => {
      let text = this.getLine(cursor.row);
      let bounds = wordFinder.findBounds(text, cursor.column);
      boundsList.push({
          start: {row: cursor.row, column: bounds.start},
          end: {row: cursor.row, column: bounds.end}
        });
    });
    return boundsList;
  }

  /**
   * Selects words that are under the cursor. Works with multiple cursors
   */
  selectCurrentWord() {
    this.setSelection(this.getCurrentWordBoundsList());
  }

  /**
   * Executes a copy operation on the clipboard
   */
  clipboardCopy() {
    this.textEditor.copySelectedText();
  }

  /**
   * Executes a paste operation on the clipboard
   */
  clipboardPaste() {
    this.textEditor.pasteText();
  }

}
