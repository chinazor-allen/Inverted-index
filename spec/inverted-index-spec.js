const InvertedIndexhelper = require('./inverted-index-helper');
const IndexKlass = require('./inverted-index');
const fs = require('fs');
const path = require('path');

const InvertedIndex = new IndexKlass(InvertedIndexhelper);

const book = fs.readFileSync(path.resolve(__dirname, 'books.json'));


InvertedIndex.files['books.json'] = JSON.parse(book);

describe('Inverted Index', () => {
  const helpers = new InvertedIndexhelper();
  const Index = new IndexKlass(InvertedIndexhelper);
  const file1 = book;
  const emptyFile = [];
  const notJson = 'books.js';

  afterEach(() => {
    InvertedIndex.indexTable = {};
  });


  it('should be truthy for the instance of the class', () => {
    // const indexInstance = new InvertedIndex();
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
      const createIndex = InvertedIndex.createIndex(book);
      const createIndex2 = InvertedIndex.createIndex(book);
      expect(createIndex2).toBe(false);
    });
  });

  describe('Populate Index', () => {
    const InvertedIndex2 = new IndexKlass(InvertedIndexhelper);
    InvertedIndex2.files.bk = {};
    InvertedIndex2.files.bk.books = JSON.parse(book);
    console.log(InvertedIndex2.getIndex('bk'));
    it('ensures that index is created', () => {
      expect(InvertedIndex2.createIndex('bk')).toBe(false);
    });
    // it('returns an array that contains the indexes of a word', () => {
    //   expect(typeof(InvertedIndex.createIndex(book)).toBe(typeof{}));
    // });
  });
});
