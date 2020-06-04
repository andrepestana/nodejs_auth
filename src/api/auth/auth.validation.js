const extendedArray = require('../../util/extendedArray')
const userDao = require('../../dao/userDao')
const encryptUtil = require('../../util/encryptUtil')
const messageUtil = require('../../util/messageUtil')

function getValidationsForPasswordDefinition( password, messageForId, messageIdPrefix, fieldName) {
    const minLength = 6
    let validationMessages = new extendedArray()
    validationMessages.pushDefined(required(password, messageForId, messageIdPrefix, fieldName))
    validationMessages.pushDefined(stringMin(password, messageForId, messageIdPrefix, fieldName, minLength))
    validationMessages.pushDefined(mustContainOneOf(password, messageForId, messageIdPrefix, fieldName, 'A-Z', 'uppercase character'))
    validationMessages.pushDefined(mustContainOneOf(password, messageForId, messageIdPrefix, fieldName, 'a-z', 'lowercase character'))
    validationMessages.pushDefined(mustContainOneOf(password, messageForId, messageIdPrefix, fieldName, '0-9', 'number'))
    validationMessages.pushDefined(mustContainOneOf(password, messageForId, messageIdPrefix, fieldName, regExpEscape('"\'-[]{}()*+!<=:?./\\^$|#@,'), 'special characters like "\'-[]{}()*+!<=:?./\\^$|#@,'))
    return validationMessages
}

module.exports = {
    validateUsername: function (username) {
        const messageForId = "username"
        const messageIdPrefix = "usernameValidation"
        const fieldName = "Username"
        let validationMessages = new extendedArray()

        validationMessages.pushDefined(required(username, messageForId, messageIdPrefix, fieldName))
        validationMessages.pushDefined(isEmail(username, messageForId, messageIdPrefix, fieldName))

        return validationMessages
    },
    validateUsernameDoesntExist(username) {
        const messageForId = "username"
        const messageIdPrefix = 'usernameDoesntExist'
        let validationMessages = new extendedArray()

        const persistedUser = userDao.retrieveUserByUsername(username)
        if(persistedUser) {
            validationMessages.push(messageUtil.validationMessage(messageIdPrefix, `Username not registered`, messageForId))
        }
        return validationMessages
    },
    validateUsernameExists(username) {
        const messageForId = "username"
        const messageIdPrefix = "usernameValidation"
        let validationMessages = new extendedArray()

        const persistedUser = userDao.retrieveUserByUsername(username)
        if(!persistedUser || !persistedUser.username) {
            validationMessages.push({
                messageForId,
                messageIdPrefix,
                message: `Username already registered`,
                category: 'validationMessage'
            })
        }
        return validationMessages
    },
    validateUsernameForLogin: function (username) {
        const messageForId = "username"
        const messageIdPrefix = "usernameValidation"
        const fieldName = "Username"
        let validationMessages = new extendedArray()

        validationMessages.pushDefined(required(username, messageForId, messageIdPrefix, fieldName))
        
        return validationMessages
    },
    validatePassword: function (password) {
        const messageForId = "password"
        const messageIdPrefix = "passwordValidation"
        const fieldName = "Password"

        let validationMessages = getValidationsForPasswordDefinition(password, messageForId, messageIdPrefix, fieldName)

        return validationMessages
    },
    validateConfirmPassword: function (password, confirmPassword) {
        const messageForId = "confirm-password"
        const messageIdPrefix = "confirmPasswordValidation"
        const fieldName = "Confirm Password"
        const passwordFieldName = "Password"
        let validationMessages = new extendedArray()

        validationMessages.pushDefined(required(confirmPassword, messageForId, messageIdPrefix, fieldName))
        validationMessages.pushDefined(areEqual(confirmPassword, messageForId, messageIdPrefix, fieldName, password, passwordFieldName))

        return validationMessages
    },
    validatePasswordForLogin: function (password) {
        const messageForId = "password"
        const messageIdPrefix = "passwordValidation"
        const fieldName = "Password"
        let validationMessages = new extendedArray()

        validationMessages.pushDefined(required(password, messageForId, messageIdPrefix, fieldName))
        return validationMessages
    },
    validateNewPassword: function (newPassword, oldPassword) {
        const messageForId = "new-password"
        const messageIdPrefix = "newPasswordValidation"
        const fieldName = "New Password"
        
        let validationMessages = getValidationsForPasswordDefinition(newPassword, messageForId, messageIdPrefix, fieldName)
        validationMessages.pushDefined(newPasswordMustNotBeEqualToPrevious(newPassword, messageForId, messageIdPrefix, fieldName, oldPassword))

        return validationMessages
    },
    validatePasswordMatches: function (username, password) {
        const messageForId = "password"
        const messageIdPrefix = "passwordValidation"
        const fieldName = "Password"
        let validationMessages = new extendedArray()

        if(!authenticateUsernameAndPassword({username, password})) {
            validationMessages.push(messageUtil.validationMessage(messageIdPrefix, 'Wrong password', messageForId))
        }
        return validationMessages
    },
    validateAge: function (age) {
        const messageForId = "age"
        const messageIdPrefix = "ageValidation"
        const fieldName = "Age"
        const minAge = 18
        let validationMessages = new extendedArray()

        validationMessages.pushDefined(required(age, messageForId, messageIdPrefix, fieldName))
        validationMessages.pushDefined(numberMin(age, messageForId, messageIdPrefix, fieldName, minAge))

        return validationMessages
    },
    validateTerms: function (terms) {
        const messageForId = "terms"
        const messageIdPrefix = "termsValidation"
        const fieldName = "Accepting Terms"
        let validationMessages = new extendedArray()
        validationMessages.pushDefined(required(terms, messageForId, messageIdPrefix, fieldName))

        return validationMessages
    }
}
function required(input, messageForId, messageIdPrefix, fieldName) {
    if (!input) {
        return messageUtil.validationMessage(messageIdPrefix, `${fieldName} is required`, messageForId)
    }
}
function stringMin(input, messageForId, messageIdPrefix, fieldName, min) {
    if (input && input.length < min) {
        return messageUtil.validationMessage(messageIdPrefix, `${fieldName} should have at least ${min} characters`, messageForId)
    }
}
function numberMin(input, messageForId, messageIdPrefix, fieldName, min) {
    if (input && input < min) {
        return messageUtil.validationMessage(messageIdPrefix, `The minimum allowed ${fieldName} is ${min}`, messageForId)
    }
}
function isEmail(input, messageForId, messageIdPrefix, fieldName) {
    if (input && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
        return messageUtil.validationMessage(messageIdPrefix, `${fieldName} must be a valid email`, messageForId)
    }
}
function areEqual(input, messageForId, messageIdPrefix, fieldName, input2, fieldName2) {
    if (input && input2 && input !== input2) {
        return messageUtil.validationMessage(messageIdPrefix, `${fieldName} is different from ${fieldName2}`, messageForId)
    }
}
function newPasswordMustNotBeEqualToPrevious(newPassword, messageForId, messageIdPrefix, fieldName, oldPassword) {
    if (newPassword && oldPassword && newPassword === oldPassword) {
        return messageUtil.validationMessage(messageIdPrefix, `${fieldName} must be different from previous password`, messageForId)
    }
}
function mustContainOneOf(input, messageForId, messageIdPrefix, fieldName, chars, charsName) {
    if (input) {
        let re = new RegExp('[' + chars + ']');
        if (!re.test(input)) {
            return messageUtil.validationMessage(messageIdPrefix, `${fieldName} must contain a ${charsName}`, messageForId)
        }
    }
}
function regExpEscape(literal_string) {
    return literal_string.replace(/["\'-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&');
}
function authenticateUsernameAndPassword(authData) {
    let user = userDao.retrieveUserByUsername(authData.username)
    return user && user.username && encryptUtil.comparePassword(authData.password, user.password) 
}