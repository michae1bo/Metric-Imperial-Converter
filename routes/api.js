'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.route('/api/convert').get((req, res) => {
    const initNum = convertHandler.getNum(req.query.input);
    let initUnit = convertHandler.getUnit(req.query.input);
    let string;
    let returnNum;
    let returnUnit;
    let responseJson;
    if (initNum === null || initUnit === null) {
      if (initUnit === null && initNum === null) {
        string = 'invalid number and unit';
      } else if (initNum === null) {
        string = 'invalid number';
      } else if (initUnit === null) {
        string = 'invalid unit';
      } else {
        string = 'invalid input';
      }
      responseJson = string;
    }  else {
      returnUnit = convertHandler.getReturnUnit(initUnit);
      returnNum = convertHandler.convert(initNum, initUnit);
      string = convertHandler.getString(initNum, convertHandler.spellOutUnit(initUnit), returnNum, convertHandler.spellOutUnit(returnUnit));
      responseJson = {initNum, initUnit, returnNum, returnUnit, string};
    }
    res.json(responseJson);
  });
};
