function ConvertHandler() {
  const imperialUnits = ['gal', 'mi', 'lbs'];
  const metricUnits = ['l', 'km', 'kg'];
  
  this.getNum = function(input) {
    let result
    const potNum = input.match(/[^a-z]*/i);
    if (potNum[0] === "") {
      result = 1;
    } else {
      const match = potNum[0].match(/^[0-9]+\.?([0-9]+)?(\/[0-9]+\.?([0-9]+)?)?/);
      if (match === null || match[0] !== potNum[0]) {
        result = null;
      } else {
        result = match[0];
        if (result.includes('/')) {
          const string = result;
          result = string.slice(0, string.indexOf('/')) / string.slice(string.indexOf('/') + 1);
        }
      }
    }
    
    return result;
  };
  
  this.getUnit = function(input) {
    let result
    const match = input.match(/[^a-z]*/i)
    let potUnit;
    if (match === null) {
      potUnit = input;
    } else {
       potUnit = input.slice(match[0].length);
    }
    if (imperialUnits.indexOf(potUnit.toLowerCase()) > -1) {
      result = potUnit.toLowerCase();
    } else if (metricUnits.indexOf(potUnit.toLowerCase()) > -1) {
      result = potUnit.toLowerCase();
    } else {
      result = null;
    }
    if (result === 'l') {
      result = 'L';
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    if(imperialUnits.indexOf(initUnit.toLowerCase()) > -1) {
      result = metricUnits[imperialUnits.indexOf(initUnit.toLowerCase())];
    } else {
      result = imperialUnits[metricUnits.indexOf(initUnit.toLowerCase())];
    }
    if (result === 'l') {
      result = 'L';
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch(unit) {
      case 'gal':
        result = "gallons";
        break;
      case 'L':
        result = "liters";
        break;
      case 'lbs':
        result = "pounds";
        break;
      case 'kg':
        result = "kilograms";
        break;
      case 'mi':
        result = "miles";
        break;
      case 'km':
        result = "kilometers";
        break;
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch(initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
    }
    return (Math.round(result * 100000) / 100000) ;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = initNum + " " + initUnit + " converts to " + returnNum  + " " + returnUnit;
    return result;
  };
  31
}

module.exports = ConvertHandler;
