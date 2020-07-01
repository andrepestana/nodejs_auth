const messageUtil = require('../../src/util/messageUtil')
const assert = require('assert')

describe('The validationMessage function', () => {

    it('should create an validation message object', () => {
        const actual = messageUtil.validationMessage('messageIdPrefix', 'message', 'messageForId')
        const expected = {
            messageId: 'messageIdPrefixValidationId',
            category: 'validationMessage',
            message: 'message',
            messageForId: 'messageForId'
        }
        assert.deepEqual(actual, expected)
    })
})

describe('The validationMessages function', () => {

    it('should create an array with a validation message object', () => {
        const actual = messageUtil.validationMessages('messageIdPrefix', 'message', 'messageForId')
        const expected = [{
            messageId: 'messageIdPrefixValidationId',
            category: 'validationMessage',
            message: 'message',
            messageForId: 'messageForId'
        }]
        assert.deepEqual(actual, expected)
    })
})