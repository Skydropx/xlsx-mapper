import 'script-loader!../node_modules/xlsx/dist/ods.js'
import 'script-loader!../node_modules/xlsx/dist/cpexcel.js'
import 'script-loader!../node_modules/xlsx/dist/xlsx.core.min.js'

function Workbook () {
  if (!(this instanceof Workbook)) return new Workbook()
  this.SheetNames = []
  this.Sheets = {}
}

export default class {
  convert (reader) {
    this.reader = reader
    let workbook = new Workbook()

    this.reader.rows.forEach(topRows => {
      Object.keys(topRows).forEach(sheetName => {
        workbook.SheetNames.push(sheetName)
        workbook.Sheets[sheetName] = this._sheetFromRows(topRows[sheetName])
      })
    })

    return workbook
  }

  convertToArrayOfSheets (reader) {
    this.reader = reader
    let workbooks = []

    this.reader.rows.forEach(topRows => {
      Object.keys(topRows).forEach(sheetName => {
        let workbook = new Workbook()
        workbook.SheetNames.push(sheetName)
        workbook.Sheets[sheetName] = this._sheetFromRows(topRows[sheetName])
        workbooks.push(workbook)
      })
    })

    return workbooks
  }

  _sheetFromRows (rows) {
    let ws = {}
    let range = {s: {c: 0, r: 0}, e: {c: 0, r: rows.length + 1}}

    for (let R = 0; R !== rows.length; ++R) {
      let skydropCells = Object.values(rows[R])
      range.e.c = skydropCells.length

      for (let C = 0; C !== skydropCells.length; ++C) {
        let cell = this._prepareWorkSheetRow(R, skydropCells[C], C)
        ws[cell.ref] = cell.cell
      }

      if (R === (rows.length - 1)) {
        skydropCells = this._addFixedReturn()
        for (let C = 0; C !== skydropCells.length; ++C) {
          let cell = this._prepareWorkSheetRow(R + 1, skydropCells[C], C)
          ws[cell.ref] = cell.cell
        }
      }
    }

    ws['!ref'] = XLSX.utils.encode_range(range)

    return ws
  }

  _prepareWorkSheetRow (idx, col, colIdx) {
    let cell = {v: col, t: 's'}
    let cellRef = XLSX.utils.encode_cell({c: colIdx, r: idx})

    return {cell: cell, ref: cellRef}
  }

  _addFixedReturn () {
    return [
      'idx',
      '55 2558 0633', // pickup
      'AMAZON',
      'na',
      'Pedro Celestino Negrete 820',
      'na',
      'Industrial',
      'Monterrey',
      'na',
      'na',
      '55 2558 0633', // delivery
      'AMAZON',
      'na',
      'Pedro Celestino Negrete 820', // street and number
      'na',
      'Industrial', // neighborhoodIdx
      'Monterrey',
      'na',
      'na',
      0,
      0,
      0,
      0,
      'car'
    ]
  }
}
