export default class ColumSchemaValidator {
  constructor (validatable) {
    this.expectedColumnSchema = validatable.rowsToTransform
    this.givenColumnSchema = this.workbook.headers()
  }

  validate () {
    let missingColumns = this._getMissingColumns()

    if (missingColumns) {
      return { error: null }
    }

    return _buildErrors(missingColumns)
  }

  _getMissingColumns () {
  }

  _buildErrors (missingColumns) {
    let msg = `No se encontraron las sig. columnas: missingColumns.join(', ')`

    return new ValidatorErrors({
      name: 'ColumnSchemaValidator',
      message: msg
    })
  }
}
