class invertedIndex {
  /**
   * class constructor with invertedIndexHelper as 
   * @constructor
   */
  constructor(invertedIndexHelper) {
    this.invertedIndexHelper = invertedIndexHelper;
    this.files = {
      allBooks: []
    };
    this.indexTable = {
      allIndex: {}
    };
  }

/**
 * createIndex function takes in a filepath containing JSON file as parameter
 * @param {string} filename, the name of the file to sort
 * @returns {Array} indexTable, of splitted words in alphabetical order
 */


  createIndex(filename) {
    const index = {};
    const currentFile = filename ? this.files[filename] : this.files.allBooks;
    if (currentFile) {
      currentFile.forEach((currentDoc, docIndex) => {
        const currentToken = this.invertedIndexHelper.getToken(`${currentDoc.title} ${currentDoc.text}`);
        currentToken.map((word) => {
          if (index[word]) {
            index[word].push(docIndex);
          } else {
            index[word] = [docIndex];
          }
        });
      });
      this.indexTable[filename ? filename : 'allIndex'] = index;
    } else {
      return false;
    }
  }

/**
 * function takes an indexed file as argument and return the value
 * @param {string}
 * @returns {object}
 */
  getIndex(filename) {
    return this.indexTable[filename];
  }

/**
 * function takes in an array of arguments and returns an array of numbers represnting the index of words
 * @param {string} terms
 * @returns {array}
 */

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

window.invertedIndex = invertedIndex;