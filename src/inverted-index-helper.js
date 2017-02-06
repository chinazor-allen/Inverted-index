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

  static readBookData(file) {
    if (file.length < 1) {
      return false;
    } else if (!Array.isArray(file)) {
      return false;
    }
    return true;
  }
}

window.invertedIndexHelper = invertedIndexHelper;