import WorkbookUtils from '../workbook-utils'
import CustomArray from '../custom-array'
import ValidatorErrors from './validator-errors'

export default class MissingColumnsValidator {
  constructor (validatable) {
    this.validatable = validatable
    this.workbook = new WorkbookUtils(validatable.xlsx, validatable.type, validatable.fileToParse) // as reference?
    this.rows = this.workbook.readRows()
  }

  validate () {
    let missingColumns = this._validateMissingColumns()

    if (missingColumns.length === 0) return { error: null }

    return this._missingColumnsError(missingColumns)
  }

  _validateMissingColumns () {
    let extractedColumns = this._extractColumnsToTransform()

    return extractedColumns.diff(this.workbook.head())
  }

  _missingColumnsError (missingColumns = []) {
    let msg = `Las columnas '${missingColumns.join(',')}' no existe en el archivo`

    return new ValidatorErrors('MissingColumnValidatorError', msg, 'MissingColumn')
  }

  _extractColumnsToTransform () {
    let keys = Object.keys(this.validatable.columnsToTransform)
    let mapColumn = (key) => {
      if (this.validatable.columnsToTransform[key].type === 'match')
        return this.validatable.columnsToTransform[key].value
    }
    let filteredResult = keys.map(mapColumn).filter(col => col !== undefined)

    return new CustomArray(filteredResult)
  }
}