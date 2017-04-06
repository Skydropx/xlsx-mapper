export default class FileValidator {
  constructor (validators) {
    this.validators = validators
  }

  validate () {
    return this.validators.map(validator => validator.validate())
  }
}