/**
 * InvertedIndexHelper
 * @class
 */
class InvertedIndexHelper {
/**
 * getToken()
 * Method loops through a JSON file, sorts through string, removes all special characters and spaces
 * and converts the result into an Array
 * @param {string}
 * @returns {Array} splitted words in alphabetical order 
 */
  static getToken(words) {
    const filterDuplicate = [];
    const formattedWords = words.toString().toLowerCase()
      .replace(/[^A-Z0-9\s+]/gi, ' ').replace(/\s+/, ' ')
      .split(' ');
    formattedWords.forEach((word) => {
      if (!filterDuplicate.includes(word) && word !== '') {
        filterDuplicate.push(word);
      }
    });
    return filterDuplicate;
  }

  /**
   * isValidFile()
   * takes JSON object and checks if a file is empty or invalid and returns a string of message 
   * @param {object} 
   * @returns{string}
   */
  static isValidFile(file) {
    let valid = true;
    try {
      file = JSON.parse(file);
      if(!Array.isArray(file)) {
        return false;
      }
      if (file.length !== 0) {
        file.forEach((book) => {
          if (!(book.title && book.text)) {
            valid = false;
          }
        });
      } else {
        valid = false;
      }
    } catch(e) {
      throw new Error("File invalid");
    }
    return valid;
  }
}

if (typeof window !== 'undefined') {
    window = window.InvertedIndexHelper = InvertedIndexHelper;
  } else {
    module.exports = InvertedIndexHelper;
  }