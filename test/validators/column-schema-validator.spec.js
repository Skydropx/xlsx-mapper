import chai from 'chai'
import ColumnSchemaValidator from '../../src/validators/column-schema-validator.js'
import MissingColumns from '../../src/validators/column-schema-validator/missing-columns'
import expectedResult from '../fixtures/validator/column-schema-validator/output.js'
import inputs from '../fixtures/validator/column-schema-validator/input.js'
import XLSX from 'xlsx'
import path from 'path'

chai.expect()

const expect = chai.expect
let fileName = path.resolve('./test/fixtures/file-with-tabs/input.xlsx')

describe('ColumnSchemaValidator', () => {
  describe('#validate', () => {
    it('should return an error when specific column doesnt exists', () => {
      let prop = {
        columnsToTransform: {
          name: { type: 'match', value: "Order Shipment's Order's Ship To Name"}
        },
        type: 'node',
        xlsx: XLSX,
        fileToParse: { fileName }
      }

      let missingColumns = new MissingColumns(prop)
      let columnSchemaValidator = new ColumnSchemaValidator([missingColumns])
      expect(columnSchemaValidator.validate()[0]).to.deep.equal(expectedResult.resultsWithError)
    })
  })
})
