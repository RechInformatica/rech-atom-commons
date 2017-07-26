'use babel';

import { File as AtomFile } from 'atom';

/**
 * Class for interacting with files in the FileSystem
 */
export default class File {

  constructor(path) {
    if (typeof path == "string") {
      this.path = path;
    } else {
      this.path = path.toString();
    }
    this.atomFile = new AtomFile(this.path, false);
    this.atomFile.setEncoding('windows-1252')
  }

  /**
   * Saves a buffer as a file. Completely overrides the original file. Returns a promise that will resolve once the file
   * is written
   *
   * @param {string} buffer
   * @return {Promise}
   */
  saveBuffer(buffer) {
    return this.atomFile.write(buffer);
  }

  /**
   * Loads a file's content, returning a promise that will resolve with the read
   * buffer.
   *
   * @return {Promise}
   */
  loadBuffer() {
    return this.atomFile.read();
  }

  /**
   * Test if a file exists
   *
   * @return {boolean}
   */
  exists() {
    return this.atomFile.existsSync();
  }

  /**
   * Creates a directory
   */
  mkdir() {
    const fs = require('fs');
    try {
      fs.mkdirSync(this.path);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Copies a file into a destination
   *
   * @param {string} Destiny
   */
  copy(dest) {
    var fs = require('fs');
    fs.createReadStream(this.path).pipe(fs.createWriteStream(dest));
  }

}
