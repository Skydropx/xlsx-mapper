import XL from 'xlsx';

export default class Library {
  constructor(args) {
    this._validateArgs(args);
    this.fileToParse = args.fileToParse;
    this.columnsToMatch = args.columnsToMatch;
    this.rows = []
  }

  read() {
    let workbook = XL.readFile(this.fileToParse.fileName);
    let aCol = this.columnsToMatch['A'];
    
    workbook.SheetNames.forEach(sheetName => {
      let worksheet = workbook.Sheets[sheetName];
      this.rows.push(XL.utils.sheet_to_json(worksheet));
    });
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
