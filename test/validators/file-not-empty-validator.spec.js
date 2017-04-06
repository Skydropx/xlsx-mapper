import chai from 'chai'
import FileNotEmptyValidator from '../../src/validators/file-not-empty-validator'
import expectedResult from '../fixtures/validator/file-validator/output.js'
import inputs from '../fixtures/validator/file-validator/input.js'
import XLSX from 'xlsx'
import path from 'path'

chai.expect()

const expect = chai.expect
let fileName = path.resolve('./test/fixtures/validator/empty.xlsx')

describe.only('FileNotEmptyValidator', () => {
  describe('#validate', () => {
    it('should return an error when extension is invalid', () => {
      let obj = {
        columnsToTransform: {
          name: { type: 'match', value: "Order Shipment's Order's Ship To Name"}
        },
        type: 'node',
        xlsx: XLSX,
        fileToParse: { fileName }
      }
      let fileNotEmptyValidator = new FileNotEmptyValidator(obj)
      expect(fileNotEmptyValidator.validate()).to.deep.equal(expectedResult.fileNotEmptyError)
    })
  })
})
