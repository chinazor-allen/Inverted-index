/**
 *  InvertedIndex
 * @class
 */
class InvertedIndex {
  /**
   * class constructor with invertedIndexHelper as 
   * @constructor
   */
  constructor(InvertedIndexHelper) {
    this.invertedIndexHelper = InvertedIndexHelper;
    this.files = {};
    this.indexTable = {};
  }

/**
 * createIndex function takes in a filename containing JSON file (fileContent) as parameter
 * @param {string} filename, the name of the file for which index would be created
 * @param {Array} fileContent, JSON file
 * @returns {Boolean} false
 */
  createIndex(filename, fileContent) {
    const index = {};
    if (fileContent) {
      fileContent.forEach((currentDoc, docIndex) => {
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
    const result = {}
    return (result[filename] = this.indexTable[filename]) ? result : this.indexTable;
  }

/**
 * function takes in an array of arguments and returns an array of numbers represnting the index of words
 * @param {string} -terms
 * @param {string} -filename
 * @returns {array}
 */
  searchIndex(filename, terms) {
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

//condition to export file
try {
  window.InvertedIndex = InvertedIndex;
} catch(e) {
  module.exports = InvertedIndex;
}