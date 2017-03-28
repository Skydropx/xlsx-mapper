export default class MapperColumn {
  constructor(columnsToTransform) {
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

      switch(transformType) {
        case 'match' :
          obj[key] = row[transformSetting.value]
          break;
      }
    })

    return obj
  }

  _mapMultipleRows(rows) {
    return rows.map(this._mapSingleRow.bind(this))
  }
}