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


describe('Inverted Index', () => {
  const InvertedIndex = new invertedIndex();
  const helpers = new invertedIndexHelper();
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

  describe('', () => {

  });
});