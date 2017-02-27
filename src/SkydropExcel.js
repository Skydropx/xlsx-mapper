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
    let workbook = new Workbook();
    let wbout;
    let worksheet = this._sheetFromRows(reader);

    workbook.SheetNames.push('Stories');
    workbook.Sheets['Stories'] = worksheet;

    return workbook;
  }

  _sheetFromRows (reader) {
    let Province = 1;
    let City = 2;
    let detailAddress = 3;
    let holderName = 4;
    let i = 0;
    let ws = {};
    let range = {s: {c:0, r:0}, e: {c:0, r:0 }};

    for (let R = 0; R != reader.rows.length; ++R) {
      if (range.e.r < R) range.e.r = R;
        range.e.c = 3;

        console.log(reader.rows[R]['City'])
        var cell = { v: reader.rows[R]['City'] };

        /* create the correct cell reference */
        var cell_ref = Xlsx.utils.encode_cell({c:3,r:R});
        cell.t = 's';

        /* add to structure */
        ws[cell_ref] = cell;
    }

    ws['!ref'] = Xlsx.utils.encode_range(range);
    // reader.rows.forEach((row) => {
    //   let cell_ref = Xlsx.utils.encode_cell({c: City, r: i});
    //   ws[cell_ref] = {v: 'Hola', t:'s'};
    //   i++;
    // });

    return ws;
  }
}
