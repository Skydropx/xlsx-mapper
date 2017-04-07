import SkydropExcel from './skydrop-excel'
// import 'script-loader!../node_modules/xlsx/dist/xlsx.full.min.js'
import 'script-loader!../node_modules/xlsx/dist/ods.js'
import 'script-loader!../node_modules/xlsx/dist/cpexcel.js'
import 'script-loader!../node_modules/xlsx/dist/xlsx.core.min.js'
import ColumnMapper from './column-mapper'
import Validator from './validators'

export default class XLSXMapper {
  constructor (args) {
    this._validateArgs(args)
    this.fileToParse = args.fileToParse
    this.columnsToTransform = args.columnsToTransform
    this.rows = []
    this.type = args.type || 'node'
    this.xlsx = args.xlsx || XLSX
    this.grouperType = args.grouperType // should be column or sheet
    this.column = args.column
    this.filterOpts = args.filterOpts
    this.group = args.group
    this.mapper = new ColumnMapper(this.columnsToTransform)
    this.workbook = this._readWorkbook()
  }

  apply () {
    // this.errors = Validator.execute(this)

    // if (this.errors.length > 0) {
    //   return []
    // }

    if (this.grouperType === 'column' && this.group) {
      this._groupByColumn()
    } else if (this.group) {
      this._groupByTab()
    } else if (!this.group) {
      this._ungroupedRows()
    }

    if (this.filterOpts) {
      this._filterRows()
    }

    return this.rows
  }

  uniqColumns (rows, column = null) {
    let col
    column ? col = column : col = this.column
    return rows.map(row => row[col])
      .filter((value, index, self) => {
        return self.indexOf(value) === index
      })
  }

  convert () {
    let skydropExcel = new SkydropExcel()

    return skydropExcel.convert(this)
  }

  convertToArrayOfSheets () {
    let skydropExcel = new SkydropExcel()

    return skydropExcel.convertToArrayOfSheets(this)
  }

  // private methods
  _ungroupedRows (workbook) {
    this.workbook.SheetNames.forEach(sheetName => {
      let worksheet = this.workbook.Sheets[sheetName]
      let rows = this.xlsx.utils.sheet_to_json(worksheet)
      this.rows = this.mapper.map(rows)
    })
  }

  _filterRows () {
    if (this.group === true) {
      return this._filterGroupedRows()
    }

    this.rows = this.rows.filter(this._filterRow.bind(this))
  }

  _filterGroupedRows () {
    this.rows.forEach((topRows, idx, self) => {
      Object.keys(topRows).forEach((key) => {
        this.rows[idx] = { [key]: topRows[key].filter(this._filterRow.bind(this)) }
      })
    })
  }

  _filterRow (row) {
    let match = false
    this.filterOpts.columns.some(col => {
      this.filterOpts.values.some(value => {
        match = row[col] === value
        return match
      })
      return match
    })
    return match
  }

  _readWorkbook () {
    if (this.type === 'browser') {
      return this.xlsx.read(this.fileToParse.fileData, {type: 'binary'})
    }
    return this.xlsx.readFile(this.fileToParse.fileName)
  }

  _groupByColumn () {
    let sheetName = this.workbook.SheetNames[0]
    let worksheet = this.workbook.Sheets[sheetName]
    let excelRows = this.xlsx.utils.sheet_to_json(worksheet)
    let uniqCols = this.uniqColumns(excelRows)

    uniqCols.forEach(col => {
      let filteredRows = excelRows.filter(row => row[this.column] === col)
      this.rows.push({
        [col]: this.mapper.map(filteredRows)
      })
    })
  }

  _groupByTab () {
    this.workbook.SheetNames.forEach(sheetName => {
      let worksheet = this.workbook.Sheets[sheetName]
      let excelRows = this.xlsx.utils.sheet_to_json(worksheet)
      let obj = {[sheetName]: this.mapper.map(excelRows)}

      this.rows.push(obj)
    })
  }

  _validateArgs (args) {
    if (args === undefined || args === {}) {
      throw new Error('empty arguments is not allowed')
    }

    if (args.fileToParse === undefined) {
      throw new Error('fileToParse param is required')
    }

    if (args.columnsToTransform === undefined || args.columnsToTransform === {}) {
      throw new Error('columnsToTransform param is required')
    }

    if (typeof args.fileToParse !== 'object') {
      throw new Error('invalid fileToParse param')
    }

    if (typeof args.columnsToTransform !== 'object') {
      throw new Error('invalid columnsToTransform param')
    }
  }
}
