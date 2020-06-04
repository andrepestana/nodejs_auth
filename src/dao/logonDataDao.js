
let logonDataArray = []

const logonDataDao = {

    saveLogonData(logonData) {
        if (process.env.FAKE_PERSISTENT_DATA) {
            return logonDataArray.push(logonData)
        } else {
            throw 'Not implemented yet for non fake persistent data'
        }
    },
    findLogonDataByRefreshToken(token) {
        if (process.env.FAKE_PERSISTENT_DATA) {
            return logonDataArray.filter(l => l.refreshToken === token)
        } else {
            throw 'Not implemented yet for non fake persistent data'
        }
    },
    filterLogonDataByUsername(username) {
        if (process.env.FAKE_PERSISTENT_DATA) {
            return logonDataArray.filter(l => l.username === username)
        } else {
            throw 'Not implemented yet for non fake persistent data'
        }
    }
}
module.exports = logonDataDao
