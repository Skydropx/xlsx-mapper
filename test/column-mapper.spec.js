import chai from 'chai'
import ColumnMapper from '../src/column-mapper.js'
import XLSX from 'xlsx'
import path from 'path'
import expectedResult from './fixtures/mapper/output.js'
import inputs from './fixtures/mapper/input.js'
chai.expect()

const expect = chai.expect

describe('ColumnMapper', () => {
  context('with empty transformation configuration', () => {
    let mapper = new ColumnMapper(inputs.matcherConfigurations.emptyTransformation)
    it('should return empty values when matched value has empty value', () => {
      let result = mapper.map(inputs.multipleRowsWithEmptyValues)
      expect(result).to.deep.equal(expectedResult.multipleRowsWithEmptyValues)
    })
  })

  context('with simple matcher config', () => {
    let mapper = new ColumnMapper(inputs.matcherConfigurations.simple)

    describe('#map', () => {
      it('should return rows arguments transformed when map method receives multiple rows as argument', () => {
        let result = mapper.map(inputs.multipleRows)
        expect(result).to.deep.equal(expectedResult.multipleRows)
      })

      it('should return row argument transformed when map method receives single row as argument', () => {
        let result = mapper.map(inputs.multipleRows[0])
        expect(result).to.deep.equal(expectedResult.multipleRows[0])
      })
    })
  })

  context('with fixed matcher config', () => {
    let mapper = new ColumnMapper(inputs.matcherConfigurations.fixed)

    describe('#map', () => {
      it('should return rows arguments transformed when map method receives multiple rows as argument', () => {
        let result = mapper.map(inputs.multipleRows)
        expect(result).to.deep.equal(expectedResult.multipleRowsWithFixedValues)
      })

      it('should return row argument transformed when map method receives single row as argument', () => {
        let result = mapper.map(inputs.multipleRows[0])
        expect(result).to.deep.equal(expectedResult.multipleRowsWithFixedValues[0])
      })
    })
  })

  context('with transformations config', () => {
    let mapper = new ColumnMapper(inputs.matcherConfigurations.addressesMatch)

    describe('#map', () => {
      it('should return rows arguments transformed when map method receives multiple rows as argument', () => {
        let result = mapper.map(inputs.multipleRows)
        expect(result).to.deep.equal(expectedResult.multipleRowsWithTransformations)
      })

      it('should return row argument transformed when map method receives single row as argument', () => {
        let result = mapper.map(inputs.multipleRows[0])
        expect(result).to.deep.equal(expectedResult.multipleRowsWithTransformations[0])
      })
    })
  })
})
