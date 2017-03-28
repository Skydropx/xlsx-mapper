import chai from 'chai'
import MapperColumn from '../src/MapperColumn.js'
import XLSX from 'xlsx'
import path from 'path'
import expectedResult from './fixtures/mapper/output.js'
import inputs from './fixtures/mapper/input.js'
chai.expect()

const expect = chai.expect

describe('MapperColumn', () => {
  context('with simple matcher config', () => {
    let mapper = new MapperColumn(inputs.matcherConfigurations.simple)
      
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
    let mapper = new MapperColumn(inputs.matcherConfigurations.fixed)
      
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
    let mapper = new MapperColumn(inputs.matcherConfigurations.addressesMatch)

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