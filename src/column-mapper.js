import AddressParser from './address-parser'

export default class ColumnMapper {
  constructor (columnsToTransform) {
    this.tranformSettings = columnsToTransform
    this.transformEmptyValue = this._extractTransformation('empty-values')
  }

  map (data) {
    if (data instanceof Array) {
      return this._mapMultipleRows(data)
    }
    return this._mapSingleRow(data)
  }

  _mapSingleRow (row, idx = 0) {
    let obj = {}

    Object.keys(this.tranformSettings).forEach((key) => {
      let transformSetting = this.tranformSettings[key]
      let transformType = transformSetting.type
      let col

      switch (transformType) {
        case 'match' :
          obj[key] = row[transformSetting.value]
          break
        case 'fixedvalue' :
          obj[key] = transformSetting.value
          break
        case 'transformStreet' :
          col = transformSetting.value
          obj[key] = new AddressParser(row[col]).parseStreet()
          break
        case 'transformNeighborhood' :
          col = transformSetting.value
          obj[key] = new AddressParser(row[col]).parseNeighborhood()
          break
        case 'autoincrement' :
          obj[key] = `${idx + 1}`
          break
      }
    })

    return obj
  }

  _mapMultipleRows (rows) {
    return rows.map(this._mapSingleRow.bind(this))
  }

  _replaceEmptyValue (valueAtColumn) {
    if (valueAtColumn === '') {
      return this.transformEmptyValue
    }

    return valueAtColumn
  }
  _extractTransformation (transformationName) {
    switch (transformationName) {
      case 'empty-values' :
        if (this.tranformSettings['emptyValues']) {
          let tempValue = this.tranformSettings['emptyValues'].value
          delete this.tranformSettings['emptyValues']
          return tempValue
        }
    }
  }
}
