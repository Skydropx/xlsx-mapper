export default class FileExtensionValidator {
  constructor () {
    
  }

  validate () {
    let fileExtensionValidated = this._validateFileExtension()

    if (fileExtensionValidated.length === 0) return { error: null }

    return this._fileExtensionError()
  }

  _validateFileExtension () {
    return [1]
  }

  _fileExtensionError () {
    return {
      error: {
        name: 'FileExtensionValidatorError',
        details: {
          message: `El archivo no tiene una extensión permitida`,
          path: 'ValidFileExtension'
        }
      }
    }
  }
}