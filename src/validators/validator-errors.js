export default class ValidatorErrors {
  constructor (name, message, path) {
    return {
      error: {
        name: name,
        details: {
          message: message,
          path: path
        }
      }
    }
  }
}