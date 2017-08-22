'use babel';

import WordFinder from '../lib/word-finder';

describe('WordFinder', () => {

  let finder = new WordFinder();

  describe('the getWord method', () => {
    it('handles undefineds and nulls', () => {
      expect(() => finder.getWord()).toThrow(new Error("sentence must not be null"));
      expect(() => finder.getWord(null, null)).toThrow(new Error("sentence must not be null"));
      expect(() => finder.getWord(null, 0)).toThrow(new Error("sentence must not be null"));
      expect(() => finder.getWord("abc")).toThrow(new Error("lookupPosition must not be null"));
    });

    it('handles incrrect parameters', () => {
      expect(() => finder.getWord("abc", -1)).toThrow(new Error("lookupPosition must be a valid index"));
    });

    it('works at the beginning of the line', () => {
      expect(finder.getWord("abc", 0)).toBe("abc");
      expect(finder.getWord("This word", 0)).toBe("This");
    });

    it('works at the end of the line', () => {
      expect(finder.getWord("abc", 3)).toBe("abc");
      expect(finder.getWord("This word", 9)).toBe("word");
    });

    it('works at the edge of the word', () => {
      expect(finder.getWord("This consists a sentence", 4)).toBe("This");
      expect(finder.getWord("This consists a sentence", 5)).toBe("consists");
      expect(finder.getWord("This consists a sentence", 6)).toBe("consists");
      expect(finder.getWord("This consists a sentence", 7)).toBe("consists");
      expect(finder.getWord("This consists a sentence", 8)).toBe("consists");
      expect(finder.getWord("This consists a sentence", 9)).toBe("consists");
      expect(finder.getWord("This consists a sentence", 10)).toBe("consists");
      expect(finder.getWord("This consists a sentence", 11)).toBe("consists");
      expect(finder.getWord("This consists a sentence", 12)).toBe("consists");
      expect(finder.getWord("This consists a sentence", 13)).toBe("consists");
      expect(finder.getWord("This consists a sentence", 14)).toBe("a");
    });

    it('split words on whitespaces', () => {
      expect(finder.getWord("This is a sentence", 6)).toBe("is");
      expect(finder.getWord("This is\ta sentence", 6)).toBe("is");
      expect(finder.getWord("This is\na sentence", 6)).toBe("is");
      expect(finder.getWord("This is\ra sentence", 6)).toBe("is");
    });

    it('split words on arithmetic operations, except minus', () => {
      expect(finder.getWord("This is+a sentence", 6)).toBe("is");
      expect(finder.getWord("This is*a sentence", 6)).toBe("is");
      expect(finder.getWord("This is/a sentence", 6)).toBe("is");
      expect(finder.getWord("This is-a sentence", 6)).toBe("is-a");
    });

    it('split words almost every symbol', () => {
      expect(finder.getWord("This is!a sentence", 6)).toBe("is");
      expect(finder.getWord("This is#a sentence", 6)).toBe("is");
      expect(finder.getWord("This is%a sentence", 6)).toBe("is");
      expect(finder.getWord("This is¨a sentence", 6)).toBe("is");
      expect(finder.getWord("This is*a sentence", 6)).toBe("is");
      expect(finder.getWord("This is(a sentence", 6)).toBe("is");
      expect(finder.getWord("This is)a sentence", 6)).toBe("is");
      expect(finder.getWord("This is=a sentence", 6)).toBe("is");
      expect(finder.getWord("This is[a sentence", 6)).toBe("is");
      expect(finder.getWord("This is]a sentence", 6)).toBe("is");
      expect(finder.getWord("This is{a sentence", 6)).toBe("is");
      expect(finder.getWord("This is}a sentence", 6)).toBe("is");
      expect(finder.getWord("This is:a sentence", 6)).toBe("is");
      expect(finder.getWord("This is;a sentence", 6)).toBe("is");
      expect(finder.getWord("This is/a sentence", 6)).toBe("is");
      expect(finder.getWord("This is\\a sentence", 6)).toBe("is");
      expect(finder.getWord("This is?a sentence", 6)).toBe("is");
      expect(finder.getWord("This is,a sentence", 6)).toBe("is");
      expect(finder.getWord("This is.a sentence", 6)).toBe("is");
    });

    it('doesn\'t split on some symbols that are valid for identifiers in some languages', () => {
      expect(finder.getWord("This is@a sentence", 7)).toBe("is@a");
      expect(finder.getWord("This is$a sentence", 7)).toBe("is$a");
      expect(finder.getWord("This is&a sentence", 7)).toBe("is&a");
    });

    it('doesn\'t split words on underscore', () => {
      expect(finder.getWord("This is_a sentence", 7)).toBe("is_a");
    });

    it('doesn\'t split words on accents', () => {
      expect(finder.getWord("This is a séntencé", 13)).toBe("séntencé");
    });

  });

});
