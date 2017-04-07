import WorkbookUtils from '../workbook-utils'
import ValidatorErrors from './validator-errors'

export default class FileNotEmptyValidator {
  constructor (validatable) {
    this.validatable = validatable
    this.workbook = new WorkbookUtils(validatable.xlsx, validatable.type, validatable.fileToParse) // as reference?
    this.rows = this.workbook.readRows()
  }

  validate () {
    if (this.rows > 0) return { error: null }

    return this._fileNotEmptyError()
  }

  _fileNotEmptyError () {
    let msg = 'El archivo está vacio'

    return new ValidatorErrors('FileNotEmptyError', msg, 'ValidNotEmpty')
  }
}
