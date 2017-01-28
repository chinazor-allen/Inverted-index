'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var invertedIndex = function () {
  function invertedIndex() {
    _classCallCheck(this, invertedIndex);

    this.files = {
      allBooks: []
    };
    this.indexTable = {
      allIndex: {}
    };
  }

  _createClass(invertedIndex, [{
    key: 'createIndex',
    value: function createIndex(filename) {
      var index = {};
      var currentFile = filename ? this.files[filename] : this.files.allBooks;
      if (currentFile) {
        currentFile.forEach(function (currentDoc, docIndex) {
          var currentToken = invertedIndexHelper.getToken(currentDoc.title + ' ' + currentDoc.text);
          currentToken.map(function (word) {
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
  }, {
    key: 'getIndex',
    value: function getIndex(filename) {
      return this.indexTable[filename];
    }
  }, {
    key: 'searchIndex',
    value: function searchIndex(terms, filename) {
      var searchResult = {};
      var allSearchTerms = invertedIndexHelper.getToken(terms);

      var fileIndex = this.indexTable[filename ? filename : 'allIndex'];
      var indexedTerms = Object.keys(fileIndex);
      allSearchTerms.forEach(function (word) {
        if (indexedTerms.includes(word)) {
          searchResult[word] = fileIndex[word];
        } else {
          searchResult[word] = [];
        }
      });
      console.log(searchResult);
      return searchResult;
    }
  }]);

  return invertedIndex;
}();