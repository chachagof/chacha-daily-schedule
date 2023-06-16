const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../models/users')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new localStrategy({usernameField:"email",passReqToCallback:true},(email,password,cb)=>{
    User.findOne({email})
      .then(user => {
        if(!user){
          return cb(null,false,req.flash('warning_msg','Email or password is wrong'))
        }
        if(user.password !== password){
          return cb(nell,false,req.flash('warning_msg','Email or password is wrong'))
        }
        return cb(null,user)
      })
      .catch(err => cb(err,null))
  }))

  passport.serializeUser((user,cb)=>{
    cb(null,user.id)
  })

  passport.deserializeUser((id,cb)=>{
    User.findById({id})
      .lean()
      .then(user =>cb(null,user))
      .catch(err => cb(err,null))
  })
}