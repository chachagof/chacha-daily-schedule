const express = require('express')
const router = express.Router()
const User = require('../../models/users')

//login
router.get('/login',(req,res)=>{
  res.render('login')
})

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
      return User.create({name,email,password})
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
})


module.exports = router