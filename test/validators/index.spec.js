import chai from 'chai'
import Validator from '../../src/validators'
import FileExtensionValidator from '../../src/validators/file-extension-validator'
import FileNotEmptyValidator from '../../src/validators/file-not-empty-validator'
import fileValidatorExpectedResult from '../fixtures/validator/file-validator/output.js'
import rowValidatorExpectedResult from '../fixtures/validator/row-validator/output.js'
import missingColumnsValidatorExpectedResult from '../fixtures/validator/column-schema-validator/output.js'
import XLSX from 'xlsx'
import path from 'path'

chai.expect()

const expect = chai.expect
let fileName = path.resolve('./test/fixtures/validator/input.xlsx')

describe('Validator', () => {
  describe('#validate', () => {
    let obj = {
      columnsToTransform: {
        name: { type: 'match', value: "Order Shipment's Order's Ship To Name"}
      },
      type: 'node',
      xlsx: XLSX,
      fileToParse: { fileName }
    }

    it('should return array of errors when specific validators are passed', () => {
      let validators = [
        FileExtensionValidator,
        FileNotEmptyValidator
      ]
      let expectedResults = [
        {error: null}, 
        fileValidatorExpectedResult.fileNotEmptyError
      ]
      expect(Validator.execute(obj,validators)).to.deep.equal(expectedResults)
    })

    it('should return all validation errors when validators are no present', () => {
      let expectedResults = [
        {error: null},
        rowValidatorExpectedResult.anotherRowError,
        fileValidatorExpectedResult.fileNotEmptyError,
        missingColumnsValidatorExpectedResult.resultsWithError
      ]

      expect(Validator.execute(obj)).to.deep.equal(expectedResults)
    })
  })
})
