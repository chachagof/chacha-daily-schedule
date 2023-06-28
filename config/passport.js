const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const facebookStrategy = require('passport-facebook').Strategy
const googleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/users')
const bcrypt = require('bcryptjs')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new localStrategy({usernameField:"email",passReqToCallback:true},(req,email,password,cb)=>{
    User.findOne({email})
      .then(user => {
        if(!user){
          return cb(null,false,req.flash('warning_msg','Email or password is wrong'))
        }
        return bcrypt.compare(password,user.password)
          .then(match =>{
            if(!match){
              return cb(nell,false,req.flash('warning_msg','Email or password is wrong'))
            }
            return cb(null,user)
          })
      })
      .catch(err => cb(err,null))
  }))

  passport.use(new facebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  },(accessToken, refreshToken, profile, cb) => {
    const { name, email } = profile._json
    User.findOne({ email })
      .then(user => {
        if (user) return cb(null, user)
        const randomPassword = Math.random().toString(36).slice(-8)
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => User.create({
            userName:name,
            email,
            password: hash
          }))
          .then(user => cb(null, user))
          .catch(err => cb(err, false))
      })
  }))

  passport.use(new googleStrategy(
    {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    const {name,sub} = profile._json
    const randomPassword = Math.random().toString(36).slice(-8)
    User.findOne({email:`${sub}@google`})
      .then(user => {
        if(user)return cb(null,user)
        bcrypt.genSalt(10)
          .then(salt =>bcrypt.hash(randomPassword,salt))
          .then(hash => {
            User.create({
              userName:name,
              email:`${sub}@google`,
              password:hash
            })
          })
          .then(user => cb(null,user))
          .catch(err => console.log(err))
      })
  }))

  passport.serializeUser((user,cb)=>{
    cb(null,user.id)
  })

  passport.deserializeUser((id,cb)=>{
    User.findById(id)
      .lean()
      .then(user =>cb(null,user))
      .catch(err => cb(err,null))
  })
}