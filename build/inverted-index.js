'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var invertedIndex = function () {
  function invertedIndex() {
    _classCallCheck(this, invertedIndex);

    this.files = {};
    this.indexTable = {};
  }

  _createClass(invertedIndex, [{
    key: 'createIndex',
    value: function createIndex(filename) {
      var index = {};
      if (Object.hasOwnProperty.call(this.files, filename)) {
        var currentFile = this.files[filename];
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
        this.indexTable[filename] = index;
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
    value: function searchIndex(terms, filenames) {
      var _this = this;

      this.searchResult = {};
      if (typeof filenames === 'undefined') {
        filenames = Object.keys(newInvert.indexTable);
      }
      var allSearchTerms = invertedIndexHelper.getToken(terms);
      filenames.forEach(function (file) {
        if (file in _this.indexTable) {
          allSearchTerms.forEach(function (term) {
            if (term in _this.indexTable[file]) {
              if (file in _this.searchResult) {
                _this.searchResult[file][term] = _this.indexTable[file][term];
              } else {
                _this.searchResult[file] = {};
                _this.searchResult[file][term] = _this.indexTable[file][term];
              }
            }
          });
        }
      });
      return this.searchResult;
    }
  }]);

  return invertedIndex;
}();