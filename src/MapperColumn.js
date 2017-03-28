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
      let prevKey = this.tranformSettings[key]
      obj[key] = row[prevKey]
    })

    return obj
  }

  _mapMultipleRows(rows) {
    return rows.map(this._mapSingleRow.bind(this))
  }
}