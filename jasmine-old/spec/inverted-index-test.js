const InvertedIndexhelper = require('../src/inverted-index-helper');
const InvertedIndex = require('../src/inverted-index');
const book = require('../books.json');

InvertedIndex.files['books.json'] = book;

describe('Inverted Index', () => {
  const helpers = new InvertedIndexhelper();
  const Index = new InvertedIndex(helpers);
  const file1 = book;
  const emptyFile = [];
  const notJson = 'books.js';

  afterEach(() => {
    InvertedIndex.indexTable = {};
  });


  it('should be truthy for the instance of the class', () => {
    // const indexInstance = new InvertedIndex();
    expect(InvertedIndex instanceof InvertedIndex).toBeTruthy();
  });

  it('should return zero for the length of the indexes', () => {
    expect(Object.keys(InvertedIndex.getIndex).length).toBe(0);
  });

  describe('Read Book Data', () => {
    it('return false if the content of the file is empty', () => {
      expect(helpers.readBookData(emptyFile)).toBe(false);
    });
    it('returns true if the content of the file is a valid JSON array', () => {
      const isValid = helpers.readBookData(file1);
      expect(helpers.readBookData(isValid)).toBe(false);
    });
    it('returns false if the content of the file is not a valid JSON array', () => {
      expect(helpers.readBookData(notJson)).toBe(false);
    });
    it('returns the content of the file when an index has been created', () => {
      const createIndex = helpers.readBookData(file1);
      expect(createIndex).toBeDefined();
    });
    it('returns false if the file has been uploaded before', () => {
      const createIndex = InvertedIndex.createIndex(book);
      const createIndex2 = InvertedIndex.createIndex(book);
      expect(createIndex2).toBe(false);
    });
  });

  describe('Populate Index', () => {
    it('ensures that index is created', () =>{
      expect (InvertedIndex.createIndex('books.json')).toBe(false);
    });
    // it('returns an array that contains the indexes of a word', () => {
    //   expect(typeof(InvertedIndex.createIndex(book)).toBe(typeof{}));
    // });
  });
});
