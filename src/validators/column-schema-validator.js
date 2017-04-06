export default class ColumnSchemaValidator {
  constructor (xlsxMapper) {
    this.xlsxMapper = xlsxMapper
    this.rows = this._readWorkbook()
  }

  validate () {
    let missingColumns = this._validateMissingColumns()

    if (missingColumns.length === 0) {
      return { error: null }
    }

    return this._addError(missingColumns)
  }

  _validateMissingColumns () {
    return this._diff(this._extractColumns(), this._head())
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
    let keys = Object.keys(this.xlsxMapper.columnsToTransform)
    let mapColumn = (key) => {
      if (this.xlsxMapper.columnsToTransform[key].type === 'match')
        return this.xlsxMapper.columnsToTransform[key].value
    }
    return keys.map(mapColumn).filter(col => col !== undefined)
  }

  _head () {
    return Object.keys(this.rows[0])
  }

  _matrixToArray (matrix) {
    return matrix.reduce((prev, next) => prev.concat(next))
  }

  _diff (arr1, arr2) {
    return arr1.filter(idx => arr2.indexOf(idx) < 0 )
  }

  _readWorkbook () {
    let workbook

    if (this.xlsxMapper.type === 'browser') {
      workbook = this.xlsxMapper.xlsx.read(this.xlsxMapper.fileToParse.fileData, {type: 'binary'})
    } else {
      workbook = this.xlsxMapper.xlsx.readFile(this.xlsxMapper.fileToParse.fileName)
    }

    let arrayOfSheets = workbook.SheetNames.map(sheetName => {
      let worksheet = workbook.Sheets[sheetName]
      return this.xlsxMapper.xlsx.utils.sheet_to_json(worksheet)
    })

    return this._matrixToArray(arrayOfSheets)
  }
}
