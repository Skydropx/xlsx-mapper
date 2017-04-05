import chai from 'chai'
import ColumnSchemaValidator from '../../src/validators/column-schema-validator.js'
import expectedResult from '../fixtures/validator/column-schema-validator/output.js'
import inputs from '../fixtures/validator/column-schema-validator/input.js'
import XLSX from 'xlsx'
import path from 'path'

chai.expect()

const expect = chai.expect
let fileName = path.resolve('./test/fixtures/file-with-tabs/input.xlsx')

describe('ColumnSchemaValidator', () => {

  it.only('should return an error when specific column doesnt exists', () => {
    let prop = {
      columnsToTransform: {
        name: { type: 'match', value: "Order Shipment's Order's Ship To Name"},
        street_name_and_number: { type: 'match', value: "Order Shipment's Order's Ship To Street Line 1"},
        municipality: { type: 'match', value: "Order Shipment's Order's Ship To City"},
        neighborhood: { type: 'match', value: "Order Shipment's Order's Ship To Suburb"},
        province: { type: 'fixedvalue', value: 'Mexico'},
        orderId: { type: 'match', value: "Order Shipment's Order's Invoice Number"},
        lat: { type: 'fixedvalue', value: 19.4374278},
        lng: { type: 'fixedvalue', value: -99.1677184},
        postalCode: {type: 'match', value: "Order Shipment's Order's Ship To Postal Code 2"}
      },
      type: 'node',
      xlsx: XLSX,
      file: fileName
    }

    let columnSchemaValidator = new ColumnSchemaValidator(prop)

    expect(columnSchemaValidator.validate()).to.deep.equal(expectedResult.resultsWithError)
  })
})
