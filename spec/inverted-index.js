class InvertedIndex {
  /**
   * class constructor with invertedIndexHelper as 
   * @constructor
   */
  constructor(InvertedIndexHelper) {
    this.invertedIndexHelper = InvertedIndexHelper;
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


  createIndex(filename, fileContent) {
    const index = {};
    const currentFile = fileContent;
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
      this.indexTable[filename] = index;
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
    const filenames = filename ? [filename] : Object.keys(this.indexTable);
    filenames.forEach((filename) => {
      const fileIndex = this.indexTable[filename];
      const indexedTerms = Object.keys(fileIndex);
      searchResult[filename] = {};
      allSearchTerms.forEach((word) => {
        if (indexedTerms.includes(word)) {
          searchResult[filename][word] = fileIndex[word];
        } else { 
          searchResult[filename][word] = [];
        }
      });
    })
    return searchResult;
  }
}


module.exports = InvertedIndex;