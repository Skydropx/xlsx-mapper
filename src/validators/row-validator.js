import WorkbookUtils from '../workbook-utils'
import ValidatorErrors from './validator-errors'

export default class RowValidator {
  constructor (validatable) {
    this.validatable = validatable
    this.workbook = new WorkbookUtils(validatable.xlsx, validatable.type, validatable.fileToParse)
    this.rows = this.workbook.readRows()
  }

  validate () {
    let baseKeys = Object.keys(this.validatable.columnsToTransform)
    let fieldsToCheck = baseKeys.map(key => this.validatable.columnsToTransform[key].value)
    let rowsErrors = this.rows.map((row, index, array) => this.validateRow(row, fieldsToCheck, index)).filter(rowError => rowError !== '')

    if (rowsErrors === 0) return { error: null }

    return this._rowsError(rowsErrors)
  }

  validateRow (row, fieldsToCheck, index) {
    return fieldsToCheck.filter(field => {
      return (row[field] === undefined || row[field] === null || row[field] === '')
    }).map(invalidField => this._rowError(invalidField, index)).join(', ')
  }

  _rowError (field, index) {
    return `El renglón ${index + 2} tiene un valor no permitido para la celda '${field}'`
  }

  _rowsError (rowsErrors) {
    let msg = rowsErrors.join(',')

    return new ValidatorErrors('RowValidatorError', msg, 'ValidRow')
  }
}