import chai from 'chai'
import XLSXMapper from '../dist/xlsx-mapper.js'
import XLSX from 'xlsx'
import path from 'path'
import expectedResult from './fixtures/file-with-tabs/output.js'
chai.expect()

const expect = chai.expect

describe('XLSXMapper', () => {
  let fileName = path.resolve('./test/fixtures/file-with-tabs/input.xlsx')
  let xlsxMapper

  beforeEach(() => {
    xlsxMapper = new XLSXMapper({
      fileToParse: { fileName },
      columnsToTransform: {
        'A': { type: 'match', value: 'Province' },
        'B': { type: 'match', value: 'City' },
        'C': { type: 'match', value: 'Detail Address' },
        'D': { type: 'match', value: 'Holder Name' }
      },
      type: 'node',
      xlsx: XLSX
    })
  })

  describe('#apply', () => {
    it('should make a partial match filtering by City without group', () => {
      xlsxMapper.filterOpts = {
        columns: ['B'],
        values: ['CIUDAD GENERAL ESCOBEDO', 'SAN NICOLÁS DE LOS GARZA']
      }
      xlsxMapper.apply()
      expect(xlsxMapper.rows).to.deep.equal(expectedResult.partialResultsUngrouped)
    })

    it('should make a partial match filtering by City', () => {
      xlsxMapper.group = true
      xlsxMapper.filterOpts = {
        columns: ['B'],
        values: ['CIUDAD GENERAL ESCOBEDO', 'SAN NICOLÁS DE LOS GARZA']
      }
      xlsxMapper.apply()
      expect(xlsxMapper.rows).to.deep.equal(expectedResult.partialResults)
    })

    it('should make a full match filtering by City', () => {
      xlsxMapper.group = true
      xlsxMapper.filterOpts = {
        columns: ['B'],
        values: ['CIUDAD GENERAL ESCOBEDO', 'General Escobedo', 'SAN NICOLÁS DE LOS GARZA']
      }
      xlsxMapper.apply()
      expect(xlsxMapper.rows).to.deep.equal(expectedResult.allResults)
    })

    it('should make an empty match filtering by City', () => {
      xlsxMapper.group = true
      xlsxMapper.filterOpts = {
        columns: ['B'],
        values: ['San Pedro Garza Garcia']
      }
      xlsxMapper.apply()
      expect(xlsxMapper.rows).to.deep.equal(expectedResult.emptyResults)
    })

    it('should return mapped rows to given columns', () => {
      xlsxMapper.group = false
      xlsxMapper.columnsToMap = {
        'A': { type: 'match', value: 'Province' },
        'B': { type: 'match', value: 'City' },
        'C': { type: 'match', value: 'Detail Address' },
        'D': { type: 'match', value: 'Holder Name' }
      }
      let expected = [
        {
          A: 'NUEVO LEÓN',
          B: 'SAN NICOLÁS DE LOS GARZA',
          C: 'AV. ADOLFO LOPEZ MATEOS 4207 - 7, RINCÓN DEL ORIENTE',
          D: 'MARGARITA APARICIO MUÑOZ'
        },
        {
          A: 'NUEVO LEÓN',
          B: 'CIUDAD GENERAL ESCOBEDO',
          C: 'Quintas de los ciruelos 112, QUINTAS DE ANÁHUAC',
          D: 'Maria de Lourdes Lopez Fragoso'
        },
        {
          A: 'NUEVO LEÓN',
          B: 'SAN NICOLÁS DE LOS GARZA',
          C: 'Poniente 1019, LAS PUENTES SECTOR 1',
          D: 'O\'brian Silva'
        },
        {
          A: 'NUEVO LEÓN',
          B: 'General Escobedo',
          C: 'Mina 222 Colonia Anahuac, Madeira',
          D: 'Amalia Montalvo'
        }
      ]

      xlsxMapper.apply()
      expect(xlsxMapper.rows).to.deep.equal(expected)
    })
  })

  describe('#uniqColumns', () => {
    it('should return unique Columns of City', () => {
      xlsxMapper.group = false
      xlsxMapper.filterOpts = null
      let rows = xlsxMapper.apply()
      expect(xlsxMapper.uniqColumns(rows, 'B')).to.deep.equal(expectedResult.uniqueResults)
    })
  })
})
