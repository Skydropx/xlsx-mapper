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
    let range = {s: {c:0, r:0}, e: {c: 0, r: this.reader.rows.length }};

    for (let R = 0; R != this.reader.rows.length; ++R) {
      let skydropCells = this.toSkydropCells(this.reader.rows[R]);
      range.e.c = skydropCells.length;

      for (let C = 0; C != skydropCells.length; ++C) {
        let cell = this._prepareWorkSheetRow(R, skydropCells[C], C);
        ws[cell.ref] = cell.cell;
      }
    }

    ws['!ref'] = Xlsx.utils.encode_range(range);

    return ws;
  }

  _prepareWorkSheetRow(idx, col, colIdx) {
    let cell = { v: col};
    let cell_ref = Xlsx.utils.encode_cell({c: colIdx,r:idx});
    cell.t = 's';

    return {cell: cell, ref: cell_ref};
  }

  toSkydropCells(row) {
    return [
        'idx',
        '55 2558 0633',// pickup
        'AMAZON',
        'gutelias@amazon.com',
        'Pedro Celestino Negrete 820',
        'na',
        'Industrial',
        'Monterrey',
        'na',
        'na',
        row['Receiver Phone'],// delivery
        row['Holder Name'],
        'na',
        row['Detail Address'].split(',')[0], // street and number
        'na',
        row['Detail Address'].split(',')[1], // neighborhoodIdx
        row['City'],
        'na',
        'na',
        0,
        0,
        0,
        0,
        'car'
      ]
    return [

    ]
  }
}
