import chai from 'chai'
import XLSXMapper from '../lib/XLSXMapper.js'
import XLSX from 'xlsx'
import path from 'path';
import ExpectedResult from './fixtures/file-with-tabs/output.js'
chai.expect();

const expect = chai.expect

describe('Test filter method', () => {
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
    xlsx: XLSX,
    filter: {
      columns: ['City'],
      values: ['CIUDAD GENERAL ESCOBEDO', 'SAN NICOLÁS DE LOS GARZA']
    }
  })

  xlsxMapper.read();

  it('should load rows filtered by City', () => {
    expect(xlsxMapper.rows).to.deep.equal(ExpectedResult)
  })
})
