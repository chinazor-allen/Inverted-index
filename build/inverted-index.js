(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  InvertedIndex
 * @class
 */
var InvertedIndex = function () {
  /**
   * class constructor with invertedIndexHelper as 
   * @constructor
   */
  function InvertedIndex(InvertedIndexHelper) {
    _classCallCheck(this, InvertedIndex);

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


  _createClass(InvertedIndex, [{
    key: "createIndex",
    value: function createIndex(filename, fileContent) {
      var _this = this;

      var index = {};
      if (fileContent) {
        fileContent.forEach(function (currentDoc, docIndex) {
          var currentToken = _this.invertedIndexHelper.getToken(currentDoc.title + " " + currentDoc.text);
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

    /**
     * function takes an indexed file as argument and return the value
     * @param {string}
     * @returns {object}
     */

  }, {
    key: "getIndex",
    value: function getIndex(filename) {
      if (!filename) {
        return this.indexTable;
      }
      var result = {};
      result[filename] = this.indexTable[filename];
      return result;
    }

    /**
     * function takes in an array of arguments and returns an array of numbers represnting the index of words
     * @param {string} -terms
     * @param {string} -filename
     * @returns {array}
     */

  }, {
    key: "searchIndex",
    value: function searchIndex(filename, terms) {
      var _this2 = this;

      var searchResult = {};
      var allSearchTerms = this.invertedIndexHelper.getToken(terms);
      var filenames = filename ? [filename] : Object.keys(this.indexTable);
      filenames.forEach(function (filename) {
        var fileIndex = _this2.indexTable[filename];
        var indexedTerms = Object.keys(fileIndex);
        searchResult[filename] = {};
        allSearchTerms.forEach(function (word) {
          if (indexedTerms.includes(word)) {
            searchResult[filename][word] = fileIndex[word];
          } else {
            searchResult[filename][word] = [];
          }
        });
      });
      return searchResult;
    }
  }]);

  return InvertedIndex;
}();

window.InvertedIndex = InvertedIndex;
},{}]},{},[1])