/* global describe, it, before */

import chai from 'chai'
import Library from '../lib/XLSXMapper.js'
import XLSX from 'xlsx'
import path from 'path';
import FilteredResult from './fixtures/file-with-tabs/output.js'
chai.expect();

const expect = chai.expect

let workbook = XLSX.readFile('./test/assets/amazon.xlsx')
let lib

describe('Test filter method', () => {
  before(() => {

    let fileName = path.resolve('./test/fixtures/file-with-tabs/input.xlsx');
    lib = new Library({
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

    lib.read();
    console.log(FilteredResult)
    console.log(lib.rows[0])
  })

  it('should load rows property', () => {
    expect(lib.rows).to.have.length.above(0)
  })
})
