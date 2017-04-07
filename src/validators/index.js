import FileExtensionValidator from './file-extension-validator'
import RowValidator from './row-validator'
import FileNotEmptyValidator from './file-not-empty-validator'
import MissingColumnsValidator from './missing-columns-validator'

const VALIDATORS = [
  FileExtensionValidator,
  RowValidator,
  FileNotEmptyValidator,
  MissingColumnsValidator
]

export default class Validate {
  static execute (obj, validators = null) {
    if(!validators) {
      validators = VALIDATORS
    }

    return validators.map((VClass) => {
      let v = new VClass(obj)

      return v.validate()
    })
  }
}