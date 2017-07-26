'use babel';

import Path from '../lib/path';

describe('Path', () => {

  describe('the constructor', () => {
    it('cannot work with nulls or undefineds', () => {
      expect(() => new Path(undefined)).toThrow('Path must not be undefined or null');
      expect(() => new Path(null)).toThrow('Path must not be undefined or null');
    });
  });

  describe('the directory method', () => {
    it('works on files', () => {
      expect(new Path("c:\\tmp\\file.txt").directory()).toEqual("c:\\tmp\\");
      expect(new Path("/tmp/file.txt").directory()).toEqual("/tmp/");
    });
    it('works on folders', () => {
      expect(new Path("c:\\tmp\\").directory()).toEqual("c:\\tmp\\");
      expect(new Path("/tmp/").directory()).toEqual("/tmp/");
    });
  });

  describe('the fileName method', () => {
    it('works on files', () => {
      expect(new Path("c:\\tmp\\file.txt").fileName()).toEqual("file.txt");
      expect(new Path("/tmp/file.txt").fileName()).toEqual("file.txt");
    });
  });

  describe('the baseName method', () => {
    it('works on files', () => {
      expect(new Path("c:\\tmp\\file.txt").baseName()).toEqual("file");
      expect(new Path("/tmp/file.txt").baseName()).toEqual("file");
    });
  });

  describe('the extension method', () => {
    it('works on files', () => {
      expect(new Path("c:\\tmp\\file.txt").extension()).toEqual(".txt");
      expect(new Path("/tmp/file.docx").extension()).toEqual(".docx");
    });
  });

  describe('the fullPath method', () => {
    it('works on files', () => {
      expect(new Path("c:\\tmp\\file.txt").fullPath()).toEqual("c:\\tmp\\file.txt");
      expect(new Path("/tmp/file.docx").fullPath()).toEqual("/tmp/file.docx");
    });
  });

  describe('the setFileName method', () => {
    it('works on files', () => {
      expect(new Path("c:\\tmp\\file.txt").setFileName("another.png")).toEqual(new Path("c:\\tmp\\another.png"));
      expect(new Path("/tmp/file.txt").setFileName("another.png")).toEqual(new Path("/tmp/another.png"));
    });
  });

});
