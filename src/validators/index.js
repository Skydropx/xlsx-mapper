import * as Validators from './validators'

export default class Validate {
  static execute (obj, validators = null) {
    if (!validators) {
      validators = Validators
    }

    return this.validators.map(v => v.validate(obj))
  }
}
