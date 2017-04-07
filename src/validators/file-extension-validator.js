import extname from './extname'
import ValidatorErrors from './validator-errors'

export default class FileExtensionValidator {
  constructor (validatable) {
    if (validatable.type === 'browser') {
      this.extension = validatable
    } else {
      this.extension = extname(validatable.fileToParse.fileName)
    }
  }

  validate () {
    if (this._validateFileExtension()) return { error: null }

    return this._fileExtensionError()
  }

  _validateFileExtension () {
    return this.extension === '.xlsx'
  }

  _fileExtensionError () {
    let msg = `El archivo no tiene una extensión permitida '${this.extension}'`

    return new ValidatorErrors('FileExtensionValidatorError', msg, 'ValidFileExtension')
  }
}
