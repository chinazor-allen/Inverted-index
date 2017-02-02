(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var invertedIndex = function () {
  function invertedIndex(invertedIndexHelper) {
    _classCallCheck(this, invertedIndex);

    this.invertedIndexHelper = invertedIndexHelper;
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
      var _this = this;

      var index = {};
      var currentFile = filename ? this.files[filename] : this.files.allBooks;
      if (currentFile) {
        currentFile.forEach(function (currentDoc, docIndex) {
          var currentToken = _this.invertedIndexHelper.getToken(currentDoc.title + ' ' + currentDoc.text);
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
      var allSearchTerms = this.invertedIndexHelper.getToken(terms);

      var fileIndex = this.indexTable[filename ? filename : 'allIndex'];
      var indexedTerms = Object.keys(fileIndex);
      allSearchTerms.forEach(function (word) {
        if (indexedTerms.includes(word)) {
          searchResult[word] = fileIndex[word];
        } else {
          searchResult[word] = [];
        }
      });
      return searchResult;
    }
  }]);

  return invertedIndex;
}();

window.invertedIndex = invertedIndex;
},{}]},{},[1])