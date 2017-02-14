(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * InvertedIndexHelper
 * @class
 * 
 */
var InvertedIndexHelper = function () {
  function InvertedIndexHelper() {
    _classCallCheck(this, InvertedIndexHelper);
  }

  _createClass(InvertedIndexHelper, null, [{
    key: 'getToken',


    /**
     *getToken()
     *
     * Method loops through a JSON file, sorts through string, removes all special characters and spaces
     * and converts the result into an Array
     * @param {string}
     * @returns {Array} splitted words in alphabetical order 
     */

    value: function getToken(words) {
      var filterDuplicate = [];
      var formattedWords = words.toString().toLowerCase().replace(/[^A-Z0-9\s+]/gi, ' ').replace(/\s+/, ' ').split(' ').sort();
      for (var x in formattedWords) {
        if (filterDuplicate.indexOf(formattedWords[x]) === -1 && formattedWords[x] !== '') {
          filterDuplicate.push(formattedWords[x]);
        }
      }
      return filterDuplicate;
    }

    /**
     * isValidFile()
     * 
     * takes JSON object and checks if a file is empty or invalid and returns a string of message 
     * @param {object} 
     * @returns{string}
     */

  }, {
    key: 'isValidFile',
    value: function isValidFile(file) {
      var valid = true;
      try {
        file = JSON.parse(file);
        if (file.length !== 0) {
          file.forEach(function (book) {
            if (!(book.title && book.text)) {
              valid = false;
            }
          });
        } else {
          valid = false;
        }
      } catch (e) {
        throw new Error("File invalid");
      }
      return valid ? file : valid;
    }
  }]);

  return InvertedIndexHelper;
}();

window.InvertedIndexHelper = InvertedIndexHelper;
},{}]},{},[1])