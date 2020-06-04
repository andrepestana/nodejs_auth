const bcrypt = require('bcrypt');

module.exports = {
    cryptPassword:  function(password) {
        return bcrypt.hashSync(password, 10);
    },
    comparePassword: function(plainPass, hash) {
        return bcrypt.compareSync(plainPass, hash)
    }
}