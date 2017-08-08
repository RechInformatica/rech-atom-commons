'use babel';

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
   */
  setCursor(row) {
    if (row == undefined) {
      return;
    }
    this.textEditor.setCursorBufferPosition([row, 0]);
  }

  /**
   * Returns the current selected row
   *
   * @return {int}
   */
  getCurrentRow() {
    return this.textEditor.getCursorBufferPosition().row;
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
      let line = this.textEditor.lineTextForBufferRow(positions[i].row);
      lines.push(line);
    }
    return lines;
  }

}
