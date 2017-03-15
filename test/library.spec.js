/*global describe, it, before */

import chai from 'chai';
import Library from '../lib/XLSXMapper.js';

require('script-loader!../node_modules/xlsx/dist/ods.js')
require('script-loader!../node_modules/xlsx/dist/cpexcel.js')
require('script-loader!../node_modules/xlsx/dist/xlsx.core.min.js')
import path from 'path';

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
});

describe('Test convert method', () => {
  
});
