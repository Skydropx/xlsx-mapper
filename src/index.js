import SkydropExcel from './SkydropExcel';
// import 'script-loader!../node_modules/xlsx/dist/xlsx.full.min.js'
import 'script-loader!../node_modules/xlsx/dist/ods.js'
import 'script-loader!../node_modules/xlsx/dist/cpexcel.js'
import 'script-loader!../node_modules/xlsx/dist/xlsx.core.min.js'

export default class XLSXMapper {
  constructor(args) {
    this._validateArgs(args);
    this.fileToParse = args.fileToParse;
    this.columnsToTransform = args.columnsToTransform;
    this.rows = [];
    this.type = args.type || 'node';
    this.XLSX = args.xlsx || XLSX
    this.grouperType = args.grouperType; // should be column or sheet
    this.column = args.column
  }

  read() {
    let workbook;
    
    if (this.type === 'browser') {
      workbook = this.XLSX.read(this.fileToParse.fileData, {type: 'binary'});
    } else {
      workbook = this.XLSX.readFile(this.fileToParse.fileName);
    }
    
    if (this.grouperType === 'column') {
      let sheetName = workbook.SheetNames[0];
      let worksheet = workbook.Sheets[sheetName];
      let obj = {
        [sheetName]: []
      };
      let excelRows = this.XLSX.utils.sheet_to_json(worksheet)

      this.groupByColumn(excelRows)
    } else {
      workbook.SheetNames.forEach(sheetName => {
        let worksheet = workbook.Sheets[sheetName];
        let obj = {};
        obj[sheetName] = [];

        this.XLSX.utils.sheet_to_json(worksheet).forEach(row => {
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
  }

  groupByColumn(excelRows) {
    let uniqCols = excelRows.map(row => row[this.column])
      .filter((value, index, self) => {return self.indexOf(value) === index});

    uniqCols.forEach(col => {
      let obj = {
        [col]: excelRows.filter(row => row[this.column] === col)
      };
      this.rows.push(obj)
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

    if (args.columnsToTransform === undefined || args.columnsToTransform === {}) {
      throw new Error('columnsToMatch param is required');
    }

    if (typeof args.fileToParse !== 'object') {
      throw new Error('invalid fileToParse param');
    };

    if (typeof args.columnsToTransform !== 'object') {
      throw new Error('invalid columnsToMatch param');
    };
  }
}
