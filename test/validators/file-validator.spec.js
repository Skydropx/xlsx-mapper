import chai from 'chai'
import FileValidator from '../../src/validators/file-validator.js'
import FileNotEmptyValidator from '../../src/validators/file-validator/file-not-empty-validator'
import FileExtensionValidator from '../../src/validators/file-validator/file-extension-validator'
import expectedResult from '../fixtures/validator/file-validator/output.js'
import inputs from '../fixtures/validator/file-validator/input.js'
import XLSX from 'xlsx'
import path from 'path'

chai.expect()

const expect = chai.expect
let fileName = path.resolve('./test/fixtures/file-with-tabs/input.xlsx')

describe('FileValidator', () => {
  describe('#validate', () => {
    it('should return an error when file is empty', () => {
      let fileNotEmptyValidator = new FileNotEmptyValidator()
      let fileValidator = new FileValidator([fileNotEmptyValidator])
      expect(fileValidator.validate()[0]).to.deep.equal(expectedResult.fileNotEmptyError)
    })

    it('should return an error when eztension is invalid', () => {
      let fileExtensionValidator = new FileExtensionValidator()
      let fileValidator = new FileValidator([fileExtensionValidator])
      expect(fileValidator.validate()[0]).to.deep.equal(expectedResult.fileExtensionError)
    })
  })
})
