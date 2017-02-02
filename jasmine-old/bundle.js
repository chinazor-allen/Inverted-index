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
const book = [
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
];

const jsonFile = require('../books.json');


describe('Inverted Index', () => {
  const InvertedIndex = new invertedIndex();
  const helpers = new invertedIndexHelper();
  const file1 = jsonFile;
  const file2 =jsonFile2;
  const emptyFile = [];
  const notJson = "books.js";
  let fileName = "book.json";

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
      expect(helpers.readBookData(book)).toBe(true);
    });
    it('returns false if the content of the file is not a valid JSON array', () => {
      expect(helpers.readBookData(notJson)).toBe(false);
    });
    it('returns the content of the file when an index has been created', () => {
      const createIndex = InvertedIndex.createIndex(book);
      expect(createIndex).toBeDefined();
    });
    it('returns false if the file has been uploaded before', () => {
      const createIndex = InvertedIndex.createIndex(book);
      const createIndex2 = InvertedIndex.createIndex(book);
      expect(createIndex2).toBe(false);
    });
  });

  describe('Populate Index', () => {
    beforeEach(() => {
      InvertedIndex.createIndex('file1', file1);
    });

    it('creates index once file has been read', () =>{
      expect (InvertedIndex.getIndex.file1).toBeDefined();
    });
    it('returns an object of all created index', () =>{
      const bookIndex = InvertedIndex.getIndex.file1;
      const bookKeys = Object.keys(bookIndex);
      bookKeys.forEach((key) => {
        expect({}.hasOwnProperty.call(bookIndex,key)).toBeTruthy();
      });
    });
    it('returns an array that contains the indexes of a word', () => {
      expect(InvertedIndex.getIndex.file1.and).toEqual([0, 1]);
      expect(InvertedIndex.getIndex.file1.of).toEqual([0, 1]);
    });
    it('returns false if file is empty', ()=>{
      const emptyIndex = InvertedIndex.createIndex('empty',empty);
      expect(emptyIndex).toBe(false);
    });
    it('should not create the index again if the file has been uploaded before', () =>{
      InvertedIndex.createIndex('file1',file1);
      expect(Object.keys(InvertedIndex.getIndex).length).toBe(1);
    });
  });
});
},{"../books.json":1}]},{},[2])