class invertedIndex {
  constructor(invertedIndexHelper) {
    this.invertedIndexHelper = invertedIndexHelper;
    this.files = {
      allBooks: []
    };
    this.indexTable = {
      allIndex: {}
    };
  }


  createIndex(filename) {

    const index = {};
    const currentFile = filename ? this.files[filename] : this.files.allBooks;

    if (currentFile) {
      currentFile.forEach((currentDoc, docIndex) => {
        const currentToken = this.invertedIndexHelper.getToken(`${currentDoc.title} ${currentDoc.text}`);
        currentToken.map((word) => {
          if (index[word]) {
            index[word].push(docIndex);
          }        
          else {
            index[word] = [docIndex];
          }
        });
      });
      this.indexTable[filename ? filename : 'allIndex'] = index;
    } else {
      return false;
    }
  }

  getIndex(filename) {
    return this.indexTable[filename];
  }


  searchIndex(terms, filename) {
    const searchResult = {};
    const allSearchTerms = this.invertedIndexHelper.getToken(terms);

    const fileIndex = this.indexTable[filename ? filename : 'allIndex'];
    const indexedTerms = Object.keys(fileIndex);
    allSearchTerms.forEach((word) => {
      if (indexedTerms.includes(word)) {
        searchResult[word] = fileIndex[word];
      } else {
        searchResult[word] = [];
      }
    });
    return searchResult;
  }
}

module.exports = invertedIndex;
