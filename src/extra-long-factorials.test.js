const assert = require('assert')
const { factorial, sumNumerics, multiplyNumerics } = require('./extra-long-factorials')


describe('extraLongFactorials', () => {
    describe('sumNumerics', () => {
        it('should return correct string', () => {
            assert.equal(sumNumerics('123', '35'), '158')
            assert.equal(sumNumerics('256', '359'), '615')
            assert.equal(sumNumerics('35', '123'), '158')
            assert.equal(sumNumerics('6798678', '78967896'), '85766574')
            assert.equal(sumNumerics('0', '78967896'), '78967896')
            assert.equal(sumNumerics('5', '5'), '10')
        })
    })

    describe('multiplyNumerics', () => {
        it('should return correct string', () => {
            assert.equal(multiplyNumerics('1', 2), '2')
            assert.equal(multiplyNumerics('5', 5), '25')
            assert.equal(multiplyNumerics('1', 0), '0')
            assert.equal(multiplyNumerics('0', 5), '0')
        })
    })

    describe('factorial', () => {
        it('should return correct string', () => {
            assert.equal(factorial(1), '1')
            assert.equal(factorial(2), '2')
            assert.equal(factorial(6), '720')
            assert.equal(factorial(19), '121645100408832000')
            assert.equal(factorial(50), '30414093201713378043612608166064768844377641568960512000000000000')
        })
    })
})
