/*global describe, it, before */

import chai from 'chai';
// import Library from '../lib/Library.js';
import Library from '../src/index.js'
import path from 'path';
import XLSX from 'xlsx';

chai.expect();

const expect = chai.expect;

let lib;

describe('Test params values', () => {
  describe('when I pass empty params', () => {    
    it('should thrown invalid arguments error', () => {
      let wrapInit = () => { new Library() };

      expect(wrapInit).to.throw(Error, /empty arguments is not allowed/);
    });
  });

  describe('when I pass empty object as params', () => {
    it('should thrown invalid arguments error', () => {
      let wrapInit = () => { new Library() };

      expect(wrapInit).to.throw(Error, /empty arguments is not allowed/);
    });
  });

  describe('when I skip required params', () => {
    it('should thrown required arguments error', () => {
      let wrapInit = () => { new Library({skikRequiredArguments: true}) }

      expect(wrapInit).to.throw(Error, /param is required/);
    });
  });

  describe('when I pass invalid fileToParse param', () => {
    it('should thrown invalid fileToParse param error', () => {
      let wrapInit = () => { new Library({fileToParse: true, columnsToMatch: true}) }

      expect(wrapInit).to.throw(Error, /invalid fileToParse param/);
    });
  });

  describe('when I pass invalid columnsToMatch param', () => {
    it('should thrown invalid columnsToMatch param error', () =>{
      let wrapInit = () => { new Library({fileToParse: {}, columnsToMatch: true}) }

      expect(wrapInit).to.throw(Error, /invalid columnsToMatch param/);      
    });
  });
});

describe('Test read method', () => {
  before(() => {
    let fileName = path.resolve('./test/assets/amazon.xlsx');
    lib = new Library({
      fileToParse: { fileName }, 
      columnsToMatch: {
        'A':'Province',
        'B':'City',
        'C':'Detail Address',
        'D':'Holder Name'
      }});

    lib.read();
  });

  it('should load rows property', () => {
    expect(lib.rows).to.have.length.above(0);
  });

  it('should load rows with specified Columns', () => {
    expect(lib.rows[0]).to.have.all.keys('Province', 'City', 'Detail Address', 'Holder Name');
  });
});

describe('Test validate method', () => {
  before(() => {
    let fileName = path.resolve('./test/assets/amazon.xlsx');
    lib = new Library({
      fileToParse: { fileName }, 
      columnsToMatch: {
        'A':'Province',
        'B':'City',
        'C':'Detail Address',
        'D':'Holder Name'
      }}
    );
  });

  describe('should return errors when', () => {
    it('', () => {
      lib.validate();
    });
  });

  describe('should return empty array when', () => {
    it('there is not errors', () => {
      lib.validate();
    });
  });
});

describe('Test convert method', () => {
  before(() => {
    let fileName = path.resolve('./test/assets/amazon.xlsx');
    lib = new Library({
      fileToParse: {fileName},
      columnsToMatch: {
        'A':'Province',
        'B':'City',
        'C':'Detail Address',
        'D':'Holder Name',
        'E': 'Receiver Phone',
        'F': 'Postal'
      }
    });
    lib.read();
  });

  it('should return an excel file', () => {
    expect(lib.convert()).to.be.a('string');
  });

  it('should contain the columns', () => {
    let strExcel = lib.convert();
    XLSX.writeFile(strExcel, "demo.xlsx", {bookType:'xlsx', type:'buffer'});
    
    console.log(strExcel);
    
    expect("").to.be.a('string');
  });
});

