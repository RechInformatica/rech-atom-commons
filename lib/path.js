'use babel';

/**
 * Class for manipulation and splitting of file paths
 */
export default class Path {

  constructor(path) {
    if (path == null || path == undefined) {
      throw 'Path must not be undefined or null';
    }
    if (typeof path == "string") {
      this.path = path;
    } else {
      this.path = path.toString();
    }
  }

  /**
   * Returns the directory part of the path, with the final slash or backslash
   *
   * @return {string}
   */
  directory() {
    if (this.path.endsWith("\\") || this.path.endsWith("/")) {
      return this.path;
    } else {
      return this.path.substring(0, Math.max(this.path.lastIndexOf('\\'), this.path.lastIndexOf('/')) + 1);
    }
  }

  /**
   * Returns the file name and extension part of the path
   *
   * @return {string}
   */
  fileName() {
    return this.path.substring(Math.max(this.path.lastIndexOf('\\'), this.path.lastIndexOf('/')) + 1, this.path.length);
  }

  /**
   * Returns the file name without the extension part of the path
   *
   * @return {string}
   */
  baseName() {
    var fileName = this.fileName();
    return fileName.substring(0, fileName.lastIndexOf('.'));
  }

  /**
   * Returns the extension of the path, with the preceding dot
   *
   * @return {string}
   */
  extension() {
    var fileName = this.fileName();
    return fileName.substring(fileName.lastIndexOf('.'));
  }

  /**
   * Returns the absolute path of the specified path
   *
   * @return {string}
   */
  fullPath() {
    return this.path;
  }

  /**
   * Changes the file name and extension of the path, without changing the directory
   *
   * @param {string} fileName
   * @return {Path} the modified path
   */
  setFileName(fileName) {
    return new Path(this.directory() + fileName);
  }

  toString() {
    return this.path;
  }

}
