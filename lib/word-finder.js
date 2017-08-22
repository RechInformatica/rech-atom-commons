'use babel';

/**
 * Class for finding the bounds of a word
 */
export default class WordFinder {

  /**
   * Finds the bounds of a word in a sentence
   *
   * @param {string} sentence
   * @param {int} lookupPosition
   * @return {object} Object containing the start and end of the bounds
   */
  findBounds(sentence, lookupPosition) {
    this.validateInput(sentence, lookupPosition);
    let start = this.findStartIndex(sentence, lookupPosition);
    let end = this.findEndIndex(sentence, lookupPosition);
    return sentence.substring(start, end);
  }

  /**
   * Returns the bounded word in a sentence
   *
   * @param {string} sentence
   * @param {int} lookupPosition
   * @return {object} Object containing the start and end of the bounds
   */
  getWord(sentence, lookupPosition) {
    let bounds = this.findBounds(sentence, lookupPosition);
    return sentence.substring(bounds.start, bounds.end);
  }

  /**
   * Finds the bounds of a word in a sentence
   *
   * @param {string} sentence
   * @param {int} lookupPosition
   * @return {object} Object containing the start and end of the bounds
   */
  findBounds(sentence, lookupPosition) {
    this.validateInput(sentence, lookupPosition);
    let start = this.findStartIndex(sentence, lookupPosition);
    let end = this.findEndIndex(sentence, lookupPosition);
    return {start, end};
  }

  /**
   * Validates the input
   *
   * @param {string} sentence
   * @param {int} lookupPosition
   */
  validateInput(sentence, lookupPosition) {
    if (!sentence) {
      throw new Error("sentence must not be null");
    }
    if (lookupPosition === null || lookupPosition === undefined) {
      throw new Error("lookupPosition must not be null");
    }
    if (lookupPosition < 0 || lookupPosition > sentence.length) {
      throw new Error("lookupPosition must be a valid index");
    }
  }

  /**
   * Finds the start index of the word
   *
   * @param {string} sentence
   * @param {int} lookupPosition
   * @return {int} start index
   */
  findStartIndex(sentence, lookupPosition) {
    for (let start = lookupPosition; start >= 0; start--) {
      if (start > 0 && this.isSplitCharacter(sentence[start - 1])) {
        return start;
      }
    }
    return 0;
  }

  /**
   * Finds the end index of the word
   *
   * @param {string} sentence
   * @param {int} lookupPosition
   * @return {int} start index
   */
  findEndIndex(sentence, lookupPosition) {
    for (let end = lookupPosition; end < sentence.length; end++) {
      if (this.isSplitCharacter(sentence[end])) {
        return end;
      }
    }
    return sentence.length;
  }

  /**
   * Checks is the character is a split character
   *
   * @param {char} character
   * @return {boolean}
   */
  isSplitCharacter(char) {
    return /[^\w\u00E0-\u00FC_\-\$\@\&]/.test(char);
  }

}
