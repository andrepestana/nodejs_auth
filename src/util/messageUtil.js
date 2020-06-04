
let messageUtil = {
    successMessage(messageIdPrefix, message) {
        return {
            messageId: messageIdPrefix + 'SuccessId',
            category: 'successMessage',
            message
        }
    },
    successMessages(messageIdPrefix, message) {
        return [this.successMessage(messageIdPrefix, message)]
    }, 
    errorMessage(messageIdPrefix, message) {
        return {
            messageId: messageIdPrefix + 'ErrorId',
            category: 'errorMessage',
            message
        }
    }, 
    errorMessages(messageIdPrefix, message) {
        return [this.errorMessage(messageIdPrefix, message)]
    }, 
    validationMessage(messageIdPrefix, message, messageForId) {
        return {
            messageId: messageIdPrefix + 'ValidationId',
            category: 'validationMessage',
            message,
            messageForId
        }
    },
    validationMessages(messageIdPrefix, message, messageForId) {
        return [this.validationMessage(messageIdPrefix, message, messageForId)]
    }, 
    warningMessage(messageIdPrefix, message) {
        return {
            messageId: messageIdPrefix + 'WarningId',
            category: 'warningMessage',
            message
        }
    }, 
    warningMessages(messageIdPrefix, message) {
        return [this.warningMessage(messageIdPrefix, message)]
    }, 
    errorFromResponseMessages(error, messageId) {
        if(error.response && 
            error.response.data && 
            error.response.data.messages)
            return error.response.data.messages
          else
            return [{
                messageId: messageId,
                category: 'errorMessage',
                message: (error.response ? (error.response.status + ': ' + error.response.statusText) : error)
          }]
    }


}

module.exports = messageUtil