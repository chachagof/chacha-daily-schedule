const express = require('express')
const router = express.Router()
const Task = require('../../models/schedule')


router.get('/',(req,res)=>{
  const userId = req.user._id
  const user = req.user
  console.log(user)
  Task.find({ userId })
    .lean()
    .sort({ _id:'asc' })
    .then(tasks => {
      res.render('schedule',{tasks,user})
    })
    .catch(err => console.log(err))
})

module.exports = router