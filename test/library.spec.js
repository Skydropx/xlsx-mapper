/* global describe, it, before */

import chai from 'chai'
import Library from '../lib/XLSXMapper.js'

import XLSX from 'xlsx'
import path from 'path'

chai.expect()

const expect = chai.expect

let workbook = XLSX.readFile('./test/assets/amazon.xlsx')
let lib

describe('Test filter method', () => {
  before(() => {
    let fileName = path.resolve('./test/assets/amazon.xlsx')
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

    lib.read()
    console.log(lib.rows[0])
    /* sinon.stub(lib, '_readWorkbook', () => {
      return {

      }
    }) */
  })

  it('should load rows property', () => {
    expect(lib.rows).to.have.length.above(0)
  })
})
