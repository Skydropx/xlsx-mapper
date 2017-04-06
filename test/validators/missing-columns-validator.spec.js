import chai from 'chai'
import MissingColumnsValidator from '../../src/validators/missing-columns-validator.js'
import expectedResult from '../fixtures/validator/column-schema-validator/output.js'
import inputs from '../fixtures/validator/column-schema-validator/input.js'
import XLSX from 'xlsx'
import path from 'path'

chai.expect()

const expect = chai.expect
let fileName = path.resolve('./test/fixtures/file-with-tabs/input.xlsx')


describe.only('MissingColumnsValidator', () => {
  describe('#validate', () => {
    it('should return an error when specific column doesnt exists', () => {
      let obj = {
        columnsToTransform: {
          name: { type: 'match', value: "Order Shipment's Order's Ship To Name"}
        },
        type: 'node',
        xlsx: XLSX,
        fileToParse: { fileName }
      }
      
      let missingColumnsValidator = new MissingColumnsValidator(obj)
      expect(missingColumnsValidator.validate()).to.deep.equal(expectedResult.resultsWithError)
    })
  })
})
