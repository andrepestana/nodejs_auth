const LocalStrategy = require('passport-local').Strategy
const JWTStrategy   = require('passport-jwt').Strategy;
const ExtractJwt    = require('passport-jwt').ExtractJwt;

const encryptUtil = require('../util/encryptUtil')
const jwt = require('jsonwebtoken')

function initialize(passport, getUserByUsername, getUserById) {
  
  passport.use(new LocalStrategy({ 
                  usernameField: 'username' 
                }, 
                (username, password, done) => {
                  const user = getUserByUsername(username)
                  if (user == null) {
                    return done(null, false, { message: 'No user with that email' })
                  }
                  try {
                    if ( encryptUtil.comparePassword(password, user.password)) {
                      return done(null, user)
                    } else {
                      return done(null, false, { message: 'Password incorrect' })
                    }
                  } catch (e) {
                    return done(e)
                  }
                })
  )
  

  passport.use(new JWTStrategy({
                    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                    secretOrKey   : process.env.ACCESS_TOKEN_SECRET
                },
                function (user, done) {
                    if (!user) return done(null, false)
                    return done(null, user);
                }
                
  ))

  passport.serializeUser((user, done) => done(null, user.username))

  passport.deserializeUser((username, done) => {
    return done(null, getUserByUsername(username))
  })
}

module.exports = initialize