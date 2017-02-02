(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=[
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
]

},{}],2:[function(require,module,exports){
const InvertedIndex = new invertedIndex();
const book = require('../books');
InvertedIndex.files['books.json'] = book;

describe('Inverted Index', () => {
  const InvertedIndex = new invertedIndex();
  const helpers = new invertedIndexHelper();
  const file1 = book;
  const emptyFile = [];
  const notJson = "books.js";

  afterEach(() => {
    InvertedIndex.indexTable = {};
  });


  it('should be truthy for the instance of the class', () => {
    // const indexInstance = new InvertedIndex();
    expect(InvertedIndex instanceof invertedIndex).toBeTruthy();
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
},{"../books":1}]},{},[2])