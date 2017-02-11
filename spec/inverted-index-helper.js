/**
 * createIndex function loops through a Json file, sort and removes duplicate
 * @param {string}
 * @returns {Array} indexTable, of splitted words in alphabetical order
 */
class invertedIndexHelper {
  static getToken(words) {
    const filterDuplicate = [];
    const formattedWords = words.toLowerCase()
      .replace(/[^A-Z0-9\s]/gi, '')
      .split(' ').sort();
    for (let x in formattedWords) {
      if (filterDuplicate.indexOf(formattedWords[x]) === -1) {
        filterDuplicate.push(formattedWords[x]);
      }
    }
    return filterDuplicate;
  }

  static isValidFile(file) {
    let valid = true;
    if (file.length !== 0) {
      file.forEach((book) => {
        if (!(book.title && book.text)) {
          valid = false;
        }
      });
    } else {
      valid = false;
    }
    return valid;
  }
}

module.exports = invertedIndexHelper;
