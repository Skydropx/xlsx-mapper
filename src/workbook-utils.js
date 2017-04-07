import CustomArray from './custom-array'

export default class WorkbookUtil {
  constructor (xlsx, readType, file) {
    this.xlsx = xlsx
    this.readType = readType
    this.file = file

    this.workbook = this._readWorkbook()
  }

  head () {
    return Object.keys(this.rows[0])
  }

  readRows () {
    let arrayOfSheets = this.workbook.SheetNames.map(sn => this._mapSheet(sn))
    this.rows = new CustomArray(arrayOfSheets).matrixToArray()

    return this.rows
  }

  _mapSheet (sheetName) {
    let worksheet = this.workbook.Sheets[sheetName]
    return this.xlsx.utils.sheet_to_json(worksheet)
  }

  _readWorkbook () {
    if (this.readType === 'browser') {
      return this.xlsx.read(this.file.fileData, {type: 'binary'})
    }

    return this.xlsx.readFile(this.file.fileName)
  }
}
