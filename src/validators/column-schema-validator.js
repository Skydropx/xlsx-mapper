Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

export default class ColumnSchemaValidator {
  constructor (args) {
    Object.assign(this, args)
    this.rows = this._readWorkbook()
  }

  validate () {
    let missingColumns = this._extractColumns().diff(this._head())
    if (missingColumns.length === 0) {
      return this._emptyError()
    }

    return this._addError(missingColumns)
  }

  _emptyError () {
    return { error: null }
  }
  _addError (missingColumns = []) {
    return {
      error: {
      name: 'ColumnSchemaValidatorError',
      details: {
        message: `Las columnas '${missingColumns.join(',')}' no existe en el archivo`,
        path: 'RequiredColumnToTest'
      }
      }
    }
  }

  _extractColumns () {
    let keys = Object.keys(this.columnsToTransform)
    let mapColumn = (key) => {
      if (this.columnsToTransform[key].type === 'match')
        return this.columnsToTransform[key].value
    }
    return keys.map(mapColumn).filter(col => col !== undefined)
  }

  _head () {
    return Object.keys(this.rows[0])
  }

  _matrixToArray (matrix) {
    return matrix.reduce((prev, next) => prev.concat(next))
  }

  _readWorkbook () {
    let workbook

    if (this.type === 'browser') {
      workbook = this.xlsx.read(this.fileToParse.fileData, {type: 'binary'})
    } else {
      workbook = this.xlsx.readFile(this.fileToParse.fileName)
    }

    let arrayOfSheets = workbook.SheetNames.map(sheetName => {
      let worksheet = workbook.Sheets[sheetName]
      return this.xlsx.utils.sheet_to_json(worksheet)
    })

    return this._matrixToArray(arrayOfSheets)
  }
}
