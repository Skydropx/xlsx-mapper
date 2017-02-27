(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("xlsx"));
	else if(typeof define === 'function' && define.amd)
		define("Library", ["xlsx"], factory);
	else if(typeof exports === 'object')
		exports["Library"] = factory(require("xlsx"));
	else
		root["Library"] = factory(root["xlsx"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _xlsx = __webpack_require__(0);

var _xlsx2 = _interopRequireDefault(_xlsx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Workbook() {
  if (!(this instanceof Workbook)) return new Workbook();
  this.SheetNames = [];
  this.Sheets = {};
}

var _class = function () {
  function _class() {
    _classCallCheck(this, _class);
  }

  _createClass(_class, [{
    key: 'convert',
    value: function convert(reader) {
      var _this = this;

      this.reader = reader;

      var workbook = new Workbook();

      this.reader.rows.forEach(function (topRows) {
        Object.keys(topRows).forEach(function (sheetName) {
          workbook.SheetNames.push(sheetName);
          workbook.Sheets[sheetName] = _this._sheetFromRows(topRows[sheetName]);
        });
      });

      return workbook;
    }
  }, {
    key: '_sheetFromRows',
    value: function _sheetFromRows(rows) {
      var ws = {};
      var range = { s: { c: 0, r: 0 }, e: { c: 0, r: rows.length } };

      for (var R = 0; R !== rows.length; ++R) {
        var skydropCells = this.toSkydropCells(rows[R]);

        range.e.c = skydropCells.length;
        for (var C = 0; C !== skydropCells.length; ++C) {
          var cell = this._prepareWorkSheetRow(R, skydropCells[C], C);

          ws[cell.ref] = cell.cell;
        }
      }

      ws['!ref'] = _xlsx2.default.utils.encode_range(range);

      return ws;
    }
  }, {
    key: '_prepareWorkSheetRow',
    value: function _prepareWorkSheetRow(idx, col, colIdx) {
      var cell = { v: col, t: 's' };
      var cellRef = _xlsx2.default.utils.encode_cell({ c: colIdx, r: idx });

      return { cell: cell, ref: cellRef };
    }
  }, {
    key: 'toSkydropCells',
    value: function toSkydropCells(row) {
      return ['idx', '55 2558 0633', // pickup
      'AMAZON', 'gutelias@amazon.com', 'Pedro Celestino Negrete 820', 'na', 'Industrial', 'Monterrey', 'na', 'na', row['Receiver Phone'], // delivery
      row['Holder Name'], 'na', row['Detail Address'].split(',')[0], // street and number
      'na', row['Detail Address'].split(',')[1], // neighborhoodIdx
      row['City'], 'na', 'na', 0, 0, 0, 0, 'car'];
    }
  }, {
    key: '_findAddress',
    value: function _findAddress() {}
  }, {
    key: '_findNeighborhood',
    value: function _findNeighborhood() {}
  }]);

  return _class;
}();

exports.default = _class;
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _xlsx = __webpack_require__(0);

var _xlsx2 = _interopRequireDefault(_xlsx);

var _SkydropExcel = __webpack_require__(1);

var _SkydropExcel2 = _interopRequireDefault(_SkydropExcel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Library = function () {
  function Library(args) {
    _classCallCheck(this, Library);

    this._validateArgs(args);
    this.fileToParse = args.fileToParse;
    this.columnsToMatch = args.columnsToMatch;
    this.rows = [];
  }

  _createClass(Library, [{
    key: 'read',
    value: function read() {
      var _this = this;

      var workbook = _xlsx2.default.readFile(this.fileToParse.fileName);

      workbook.SheetNames.forEach(function (sheetName) {
        var worksheet = workbook.Sheets[sheetName];
        var obj = {};
        obj[sheetName] = [];

        _xlsx2.default.utils.sheet_to_json(worksheet).forEach(function (row) {
          var key = void 0;
          var inObj = {};

          for (key in _this.columnsToMatch) {
            inObj[_this.columnsToMatch[key]] = row[_this.columnsToMatch[key]];
          }

          obj[sheetName].push(inObj);
        });

        _this.rows.push(obj);
      });
    }
  }, {
    key: 'convert',
    value: function convert() {
      var skydropExcel = new _SkydropExcel2.default();

      return skydropExcel.convert(this);
    }
  }, {
    key: '_validateArgs',
    value: function _validateArgs(args) {
      if (args === undefined || args === {}) {
        throw new Error('empty arguments is not allowed');
      };

      if (args.fileToParse === undefined) {
        throw new Error('fileToParse param is required');
      };

      if (args.columnsToMatch === undefined || args.columnsToMatch === {}) {
        throw new Error('columnsToMatch param is required');
      }

      if (_typeof(args.fileToParse) !== 'object') {
        throw new Error('invalid fileToParse param');
      };

      if (_typeof(args.columnsToMatch) !== 'object') {
        throw new Error('invalid columnsToMatch param');
      };
    }
  }]);

  return Library;
}();

exports.default = Library;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=Library.js.map