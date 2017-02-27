import Xlsx from 'xlsx';

function Workbook() {
  if(!(this instanceof Workbook)) return new Workbook();
  this.SheetNames = [];
  this.Sheets = {};
}

function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}

export default class {
  convert (reader) {
    this.reader = reader;
    let workbook = new Workbook();
    let wbout;
    let worksheet = this._sheetFromRows();

    workbook.SheetNames.push('Stories');
    workbook.Sheets['Stories'] = worksheet;

    return workbook;
  }

  _sheetFromRows () {
    let ws = {};
    let range = {s: {c:0, r:0}, e: {c:0, r:0 }};

    for (let R = 0; R != this.reader.rows.length; ++R) {
      if (range.e.r < R) range.e.r = R;
        range.e.c = 30; // this should reflect the max col
        let cell = this._prepareWorkSheetRow(R, 1);
        ws[cell.ref] = cell.cell;
    }

    ws['!ref'] = Xlsx.utils.encode_range(range);

    return ws;
  }

  _prepareWorkSheetRow(idx, colIdx) {
    let col = this._fromCells()[colIdx];
    let cell = { v: this.reader.rows[idx][col] };
    let cell_ref = Xlsx.utils.encode_cell({c: colIdx,r:idx});
    cell.t = 's';

    return {cell: cell, ref: cell_ref};
  }

  _fromCells() {
    return [
      'Province',
      'City',
      'Detail Address',
      'Postal',
      'Holder Name',
      'Receiver Phone'
    ]
  }
}
