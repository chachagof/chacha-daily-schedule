const express = require('express')
const router = express.Router()
const User = require('../../models/users')
const passport = require('passport')
const bcrypt = require('bcryptjs')

//login page
router.get('/login',(req,res)=>{
  res.render('login')
})

//login
router.post('/login',passport.authenticate('local',{
  successRedirect:'/',
  failureRedirect:'/users/login'
}))

//register page
router.get('/register',(req,res)=>{
  res.render('register')
})

//register
router.post('/register',(req,res)=>{
  const {name,email,password,confirmPassword} = req.body
  const errorMsg = []
  if(!name || !email || !password || !confirmPassword){
    errorMsg.push({warning_msg:'All the form is required'})
  }
  if(password !== confirmPassword){
    errorMsg.push({warning_msg:'Password does not match'})
  }
  if(errorMsg.length){
    return res.render('register',{
      errorMsg,
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({email})
    .then(user =>{
      if(user){
        errorMsg.push({warning_msg:'This email is been registered'})
        return res.render('register',{
          errorMsg,
          name,
          email,
          password,
          confirmPassword
        })
      }
      return bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(password,salt))
    .then(hash => User.create({userName:name,email,password : hash}))
    .then(() => res.redirect('/users/login'))
    .catch(err => console.log(err))
    })
})

//logout
router.get('/logout',(req,res)=>{
  req.logout(()=>{
    req.flash('success_msg','Logout success')
    res.redirect('/users/login')
  })
})

module.exports = router