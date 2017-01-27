class invertedIndexHelper {
  static getToken(words) {
    const filterDuplicate = [];
    var formattedWords = words.toLowerCase()
      .replace(/[^A-Z0-9\s]/gi, "")
      .split(" ");
    for (let x in formattedWords) {
      if (filterDuplicate.indexOf(formattedWords[x]) === -1) {
        filterDuplicate.push(formattedWords[x]);
      }
    }
    return filterDuplicate;
  }

  readBookData(file) {
    if(file.length < 1) {
      return false;
    } else if (!Array.isArray(file)) {
      return false;
    } 
  }
}
