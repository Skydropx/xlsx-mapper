import chai from 'chai'
import XLSXMapper from '../lib/XLSXMapper.js'
import XLSX from 'xlsx'
import path from 'path';
import expectedResult from './fixtures/file-with-tabs/output.js'
chai.expect();

const expect = chai.expect

describe('XLSXMapper', () => {
  let fileName = path.resolve('./test/fixtures/file-with-tabs/input.xlsx');
  let xlsxMapper = new XLSXMapper({
    fileToParse: { fileName },
    columnsToTransform: {
      'A': 'Province',
      'B': 'City',
      'C': 'Detail Address',
      'D': 'Holder Name'
    },
    type: 'node',
    xlsx: XLSX
  })

  describe('#read', () => {
    let unfilteredResults = xlsxMapper.read()

    it('should make a partial match filtering by City', () => {
      xlsxMapper.filterOpts = {
        columns: ['City'],
        values: ['CIUDAD GENERAL ESCOBEDO', 'SAN NICOLÁS DE LOS GARZA']
      }
      xlsxMapper.read()
      expect(xlsxMapper.rows).to.deep.equal(expectedResult.partialResult)
    })

    it('should make a full match filtering by City', () => {
      xlsxMapper.filterOpts = {
        columns: ['City'],
        values: ['CIUDAD GENERAL ESCOBEDO', 'General Escobedo', 'SAN NICOLÁS DE LOS GARZA']
      }
      xlsxMapper.read()
      expect(xlsxMapper.rows).to.deep.equal(unfilteredResults)
    })

    it('should make an empty match filtering by City', () => {
      xlsxMapper.filterOpts = {
        columns: ['City'],
        values: ['San Pedro Garza Garcia']
      }
      xlsxMapper.read()
      expect(xlsxMapper.rows).to.deep.equal(expectedResult.emptyResult)
    })
  })
})
