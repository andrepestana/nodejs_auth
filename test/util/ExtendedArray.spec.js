const extendedArray = require('../../src/util/extendedArray')
const assert = require('assert')

describe('The extendedArray', () => {
    
    it('is an array', () => {
        const actual = new extendedArray("A","B","C")
        const expected = ["A","B","C"] 
        assert.equal(typeof actual, typeof expected)
        assert.deepEqual(actual, expected)
    }),
    it('pushDefined method should not push a null or undefined item', () => {

        let actual = new extendedArray()
        let x
        actual.pushDefined(x)
        actual.pushDefined(null)
        let expected = new extendedArray()
        assert.deepEqual(actual, expected)
        assert.deepEqual(actual, [])

    }),
    it('pushDefined method should push a defined item', () => {

        let actual = new extendedArray()
        actual.pushDefined("A")
        let notExpected = new extendedArray()
        assert.notDeepEqual(actual, notExpected)

    }),
    it('pushArray method should concat an array', () => {

        let actual = new extendedArray("1")
        actual.pushArray(["A","B","C"])
        let expected = new extendedArray("1")
        expected.push("A")
        expected.push("B")
        expected.push("C")
        assert.deepEqual(actual, expected)

    })
})
