export default class FileNotEmptyValidator {
  constructor () {
    
  }

  validate () {
    let fileNotEmptyValidated = this._validateFileNotEmpty()

    if (fileNotEmptyValidated.length === 0) return { error: null }

    return this._fileNotEmptyError()
  }

  _validateFileNotEmpty () {
    return [1]
  }

  _fileNotEmptyError () {
    return {
      error: {
        name: 'FileNotEmptyError',
        details: {
          message: 'El archivo está vacio',
          path: 'ValidNotEmpty'
        }
      }
    }
  }
}