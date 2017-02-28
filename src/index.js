import Xlsx from 'xlsx';
import SkydropExcel from './SkydropExcel';

export default class Library {
  constructor(args) {
    this._validateArgs(args);
    this.fileToParse = args.fileToParse;
    this.columnsToMatch = args.columnsToMatch;
    this.rows = [];
  }

  read() {
    let workbook = Xlsx.readFile(this.fileToParse.fileName);

    workbook.SheetNames.forEach(sheetName => {
      let worksheet = workbook.Sheets[sheetName];
      let obj = {};
      obj[sheetName] = [];

      Xlsx.utils.sheet_to_json(worksheet).forEach(row => {
        let key;
        let inObj = {};

        for (key in this.columnsToMatch) {
          inObj[this.columnsToMatch[key]] = row[this.columnsToMatch[key]];
        }

        obj[sheetName].push(inObj);
      });

      this.rows.push(obj);
    });
  }

  convert() {
    let skydropExcel = new SkydropExcel();

    return skydropExcel.convert(this);
  }

  convertToArrayOfSheets() {
    let skydropExcel = new SkydropExcel();

    return skydropExcel.convertToArrayOfSheets(this);
  }

  _validateArgs(args) {
    if (args === undefined || args === {}) {
      throw new Error('empty arguments is not allowed');
    };

    if (args.fileToParse === undefined) {
      throw new Error('fileToParse param is required');
    };

    if (args.columnsToMatch === undefined || args.columnsToMatch === {}) {
      throw new Error('columnsToMatch param is required');
    }

    if (typeof args.fileToParse !== 'object') {
      throw new Error('invalid fileToParse param');
    };

    if (typeof args.columnsToMatch !== 'object') {
      throw new Error('invalid columnsToMatch param');
    };
  }
}
