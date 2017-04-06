import WorkbookUtils from '../workbook-utils'
import CustomArray from '../custom-array'

export default class ColumnSchemaValidator {
  constructor (xlsxMapper) {
    this.xlsxMapper = xlsxMapper
    this.workbook = new WorkbookUtils(xlsxMapper.xlsx, xlsxMapper.type, xlsxMapper.fileToParse) // as reference?
    this.rows = this.workbook.readRows()
  }

  validate () {
    let missingColumns = this._validateMissingColumns()

    if (missingColumns.length === 0) return { error: null }

    return this._addError(missingColumns)
  }

  _validateMissingColumns () {
    let extractedColumns = this._extractColumnsToTransform()

    return extractedColumns.diff(this.workbook.head())
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

  _extractColumnsToTransform () {
    let keys = Object.keys(this.xlsxMapper.columnsToTransform)
    let mapColumn = (key) => {
      if (this.xlsxMapper.columnsToTransform[key].type === 'match')
        return this.xlsxMapper.columnsToTransform[key].value
    }
    let filteredResult = keys.map(mapColumn).filter(col => col !== undefined)

    return new CustomArray(filteredResult)
  }
}
