let users = []

const userDao = {
    saveUser(user) {
        if (process.env.FAKE_PERSISTENT_DATA) {
            let foundIndex = users.findIndex(u => u.username == user.username);
            if(foundIndex === -1) {
                user.id = new Date().getTime()
                users.push(user)
            } else {
                users[foundIndex] = user;
            }
        } else {
            throw 'Not implemented yet for non fake persistent data'
        }
    },
    updateUser(user) {
        if (process.env.FAKE_PERSISTENT_DATA) {
            let foundIndex = users.findIndex(u => u.username == user.username);
            if(foundIndex !== -1) {
               users[foundIndex] = user;
            }
        } else {
            throw 'Not implemented yet for non fake persistent data'
        }
    },
    retrieveUserByUsername(username) {
        if (process.env.FAKE_PERSISTENT_DATA) {
            return users.find(u => u.username === username)
        } else {
            throw 'Not implemented yet for non fake persistent data'
        }
    },
    retrieveUserById(id) {
        if (process.env.FAKE_PERSISTENT_DATA) {
            return users.find(u => u.id === id)
        } else {
            throw 'Not implemented yet for non fake persistent data'
        }
    }
}
module.exports = userDao