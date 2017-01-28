const book = require('./../books.json');
const empty = require('./../empty.json');
const Helpers = require('../../src/inverted-index-helper');
const InvertedIndex = require('../../src/inverted-index');


describe('Inverted Index', () => {
  const invertedIndex = new InvertedIndex();
  const helpers = new Helpers();
  const emptyFile = empty;

  afterEach(() => {
    invertedIndex.indexes = {};
  });

  it('should be truthy for the instance of the class', () => {
    const indexInstance = invertedIndex;
    expect(indexInstance instanceof invertedIndex).toBeTruthy();
  });

  it('should return zero for the length of the indexes', () => {
    expect(Object.keys(invertedIndex.indexTable).length).toBe(0);
  });

  describe('Read Book Data', () => {
    it('return false if the content of the file is empty', () => {
      expect(helpers.readBookData(emptyFile)).toBe(false);
    });
    it('returns true if the content of the file is a valid JSON array', () => {
      expect(helpers.readBookData(book)).toBe(true);
    });
    it('returns false if the content of the file is not a valid JSON array', () => {
      expect(helpers.readBookData(book)).toBe(false);
    });
    it('returns the content of the file when an index has been created', () => {
      const createIndex = invertedIndex.createIndex(book);
      expect(createIndex).toBeDefined();
    });
    it('returns false if the file has been uploaded before', () => {
      const createIndex = invertedIndex.createIndex(book);
      const createIndex2 = invertedIndex.createIndex(book);
      expect(createIndex2).toBe(false);
    });
  });

  describe('', () => {

  });
});