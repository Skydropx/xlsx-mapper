export default {
  fileNotEmptyError: {
    error: {
      name: 'FileNotEmptyError',
      details: {
        message: 'El archivo está vacio',
        path: 'ValidNotEmpty'
      }
    }
  },
  fileExtensionError: {
    error: {
      name: 'FileExtensionValidatorError',
      details: {
        message: `El archivo no tiene una extensión permitida`,
        path: 'ValidFileExtension'
      }
    }
  },
  results: {
    error: null
  }
}
