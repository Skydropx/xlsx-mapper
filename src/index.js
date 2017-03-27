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
    this.XLSX = args.xlsx || XLSX;
    this.grouperType = args.grouperType; // should be column or sheet
    this.column = args.column;
    this.filterOpts = args.filter;
  }

  read() {
    let workbook = this._readWorkbook();

    if (this.grouperType === 'column') {
      this._groupByColumn(workbook);
    } else {
      this._groupByTab(workbook);
    }

    if (this.filterOpts) {
      this._filterRows();
    }
  }

  _filterRows() {
    this.rows.forEach((topRows, idx, self) => {
      Object.keys(topRows).forEach((key) => {     
        this.rows[idx] = { [key]: topRows[key].filter(this._filterRow.bind(this)) };
      })
    })
  }

  _filterRow(row) {
    let match = false;
    this.filterOpts.columns.some(col => {
      this.filterOpts.values.some(value => {
        match = row[col] === value;
        return match;
      })
      return match;
    })
    return match;
  }

  _readWorkbook() {
    let workbook;
    
    if (this.type === 'browser') {
      workbook = this.XLSX.read(this.fileToParse.fileData, {type: 'binary'});
    } else {
      workbook = this.XLSX.readFile(this.fileToParse.fileName);
    }
    return workbook;
  }

  _groupByColumn(workbook) {
    let sheetName = workbook.SheetNames[0];
    let worksheet = workbook.Sheets[sheetName];
    let obj = { [sheetName]: [] };
    let excelRows = this.XLSX.utils.sheet_to_json(worksheet);
    let uniqCols = this.uniqColumns(excelRows);

    uniqCols.forEach(col => {
      let obj = { 
        [col]: excelRows.filter(row => row[this.column] === col)
      };
      this.rows.push(obj)
    });
  }

  _groupByTab(workbook) {
    workbook.SheetNames.forEach(sheetName => {
      let worksheet = workbook.Sheets[sheetName];
      let obj = {};
      obj[sheetName] = [];

      this.XLSX.utils.sheet_to_json(worksheet).forEach(row => {
        let key;
        let inObj = {};

        for (key in this.columnsToTransform) {
          inObj[this.columnsToTransform[key]] = row[this.columnsToTransform[key]];
        }

        obj[sheetName].push(inObj);
      });
      this.rows.push(obj);
    });
  }

  uniqColumns(rows) {
    return rows.map(row => row[this.column])
      .filter((value, index, self) => {return self.indexOf(value) === index});
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
      throw new Error('columnsToTransform param is required');
    }

    if (typeof args.fileToParse !== 'object') {
      throw new Error('invalid fileToParse param');
    };

    if (typeof args.columnsToTransform !== 'object') {
      throw new Error('invalid columnsToTransform param');
    };
  }
}
