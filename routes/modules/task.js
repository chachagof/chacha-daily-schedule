const express = require('express')
const router = express.Router()
const Task = require('../../models/schedule')

// create page
router.get('/new',(req,res)=>{
  return res.render('create')
})

//create task
router.post('/',(req,res)=>{
  const newTask = req.body.newTask
  return Task.create({name:newTask})
    .then(()=>res.redirect('/'))
    .catch(err => console.error(err))
})

module.exports = router