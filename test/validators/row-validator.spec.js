import chai from 'chai'
import RowValidator from '../../src/validators/row-validator'
import expectedResult from '../fixtures/validator/row-validator/output.js'
import inputs from '../fixtures/validator/row-validator/input.js'
import XLSX from 'xlsx'
import path from 'path'

chai.expect()

const expect = chai.expect
let fileName = path.resolve('./test/fixtures/validator/invalid-rows.xlsx')

describe('RowValidator', () => {
  describe('#validate', () => {
    it('should return an error when any row is invalid', () => {
      let obj = {
        columnsToTransform: {
          name: { type: 'match', value: 'Address Type'}
        },
        type: 'node',
        xlsx: XLSX,
        fileToParse: { fileName }
      }

      let rowValidator = new RowValidator(obj)
      expect(rowValidator.validate()).to.deep.equal(expectedResult.rowError)
    })
  })
})
