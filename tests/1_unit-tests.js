const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    const imperialUnits = ['gal', 'mi', 'lbs'];
    const metricUnits = ['L', 'km', 'kg'];
    const units = ['L', 'km', 'kg', 'gal', 'mi', 'lbs']
    const spelledUnits = ['liters', 'kilometers', "kilograms", "gallons", "miles", "pounds"];
    test('correctly read a whole number input', function () {
        assert.equal(convertHandler.getNum('1'), 1);
    })
    test('correctly read a decimal number input', function () {
        assert.equal(convertHandler.getNum('1.4'), 1.4);
    })
    test('correctly read a fractional input', function () {
        assert.equal(convertHandler.getNum('1/2'), 0.5);
    })
    test('correctly read a fractional input with a decimal', function () {
        assert.equal(convertHandler.getNum('3.4/2'), 1.7);
    }) 
    test('correctly return an error on a double-fraction', function () {
        assert.isNull(convertHandler.getNum('3/3/3'));
    })
    test(' correctly default to a numerical input of 1 when no numerical input is provided', function () {
        assert.equal(convertHandler.getNum(''), 1);
    })
    test('correctly read each valid input unit', function () {
        units.forEach((unit) => {
            assert.equal(convertHandler.getUnit(unit), unit);
        })
    })
    test('correctly return an error for an invalid input unit', function () {
        assert.isNull(convertHandler.getUnit('asdfa'));
    })
    
    test('return the correct return unit for each valid input unit', function () {
        for(let i = 0; i < units.length; i++) {
            let initUnit;
            let returnUnit;
            if (i <= 2) {
                initUnit = imperialUnits[i];
                returnUnit = metricUnits[i];
            } else {
                initUnit = metricUnits[i - 3];
                returnUnit = imperialUnits[i - 3];
            }
            assert.equal(convertHandler.getReturnUnit(initUnit), returnUnit);
        }
    })
    test('correctly return the spelled-out string unit for each valid input unit', function () {
        for (let i = 1; i < units.length; i++) {
            assert.equal(convertHandler.spellOutUnit(units[i]), spelledUnits[i]);
        }
    })
    test('correctly convert gal to L', function () {
        assert.equal(convertHandler.convert(1, 'gal'), 3.78541);
    })
    test('correctly convert L to gal', function () {
        assert.equal(convertHandler.convert(1, 'L'), 0.26417);
    })
    test('correctly convert mi to km', function () {
        assert.equal(convertHandler.convert(1, 'mi'), 1.60934);
    })
    test('correctly convert km to mi', function () {
        assert.equal(convertHandler.convert(1, 'km'), 0.62137);
    })
    test('correctly convert lbs to kg', function () {
        assert.equal(convertHandler.convert(1, 'lbs'), 0.45359);
    })
    test('correctly convert kg to lbs', function () {
        assert.equal(convertHandler.convert(1, 'kg'), 2.20462);
    })
});