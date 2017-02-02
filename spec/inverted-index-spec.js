const InvertedIndexhelper = require('./inverted-index-helper');
const IndexKlass = require('./inverted-index');
const fs = require('fs');
const path = require('path');

const book = fs.readFileSync(path.resolve(__dirname, 'books.json'));


describe('Inverted Index', () => {
  const helpers = new InvertedIndexhelper();
  const InvertedIndex = new IndexKlass(InvertedIndexhelper);
  const file1 = book;
  const emptyFile = [];
  const notJson = 'books.js';
  InvertedIndex.files.books = JSON.parse(book);
  InvertedIndex.createIndex('books');
  afterEach(() => {
    InvertedIndex.indexTable = {};
  });


  it('should be truthy for the instance of the class', () => {
    expect(InvertedIndex instanceof IndexKlass).toBeTruthy();
  });

  it('should return zero for the length of the indexes', () => {
    expect(Object.keys(InvertedIndex.getIndex).length).toBe(0);
  });

  describe('Read Book Data', () => {
    it('return false if the content of the file is empty', () => {
      expect(InvertedIndexhelper.readBookData(emptyFile)).toBe(false);
    });
    it('returns true if the content of the file is a valid JSON array', () => {
      const isValid = InvertedIndexhelper.readBookData(file1);
      expect(InvertedIndexhelper.readBookData(isValid)).toBe(false);
    });
    it('returns false if the content of the file is not a valid JSON array', () => {
      expect(InvertedIndexhelper.readBookData(notJson)).toBe(false);
    });
    it('returns the content of the file when an index has been created', () => {
      const createIndex = InvertedIndexhelper.readBookData(file1);
      expect(createIndex).toBeDefined();
    });
    it('returns false if the file has been uploaded before', () => {
      const createIndex = InvertedIndex.createIndex('book');
      expect(createIndex).toBe(false);
    });
  });

  describe('Populate Index', () => {
    it('ensures that index is created', () => {
      expect(InvertedIndex.createIndex('bk')).toBe(false);
    });
    it('returns an array that contains the indexes of a word', () => {
      InvertedIndex.files.bk = JSON.parse(book);
      InvertedIndex.createIndex('bk');
      expect(InvertedIndex.getIndex('bk').alice).toEqual([0]);
    });
  });

  describe('Search Index', () => {
    it('should return correct index of searched term', () => {
      InvertedIndex.files.bk = JSON.parse(book);
      InvertedIndex.createIndex('bk');
      expect(InvertedIndex.searchIndex('alice', 'bk')).toEqual({ alice: [0] });
    });
    it('should return false when no result is found', () => {
      InvertedIndex.files.bk = JSON.parse(book);
      InvertedIndex.createIndex('bk');
      expect(InvertedIndex.searchIndex('magrain', 'bk')).toEqual({ magrain: [] });
    });
  });
});
