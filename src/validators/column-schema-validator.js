export default class ColumnSchemaValidator {
  constructor (validators) {
    this.validators = validators
  }

  validate () {
    return this.validators.map(validator => validator.validate())
  }
}
