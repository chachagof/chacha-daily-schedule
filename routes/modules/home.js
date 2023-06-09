const express = require('express')
const router = express.Router()
const Task = require('../../models/schedule')

router.get('/',(req,res)=>{
  Task.find()
    .lean()
    .then(tasks => {
      res.render('schedule',{tasks})
    })
    .catch(err => console.log(err))
})

module.exports = router