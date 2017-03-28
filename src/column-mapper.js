import AddressParser from './AddressParser'

export default class ColumnMapper {
  constructor (columnsToTransform) {
    this.tranformSettings = columnsToTransform
  }

  map (data) {
    if (data instanceof Array) {
      return this._mapMultipleRows(data)
    }
    return this._mapSingleRow(data)
  }

  _mapSingleRow (row) {
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
      }
    })

    return obj
  }

  _mapMultipleRows (rows) {
    return rows.map(this._mapSingleRow.bind(this))
  }
}
