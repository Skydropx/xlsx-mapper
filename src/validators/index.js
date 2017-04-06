export default class Validate {
  static execute (obj, validators = null) {
    if(!validators) {
      validators = Validators
    }

    return validators.map((VClass) => {
      let v = new VClass(obj)

      return v.validate()
    })
  }
}