import chai from 'chai'
import MapperColumn from '../src/MapperColumn.js'
import XLSX from 'xlsx'
import path from 'path'
import expectedResult from './fixtures/mapper/output.js'
import inputs from './fixtures/mapper/input.js'
chai.expect()

const expect = chai.expect

describe('MapperColumn', () => {
  describe('#map', () => {
    let matcher = {
      'A': 'Province',
      'B': 'City',
      'C': 'Detail Address',
      'D': 'Holder Name'
    }

    let mapper = new MapperColumn(matcher)
    context('when map method receive as argument multiple rows', () => {
      it('wharever', () => {
        let result = mapper.map(inputs.multipleRows)
        expect(result).to.deep.equal(expectedResult.multipleRows)
      })
    })
  })
})