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

//edit page
router.get('/edit',(req,res)=>{
  return Task.find()
    .lean()
    .then(tasks => res.render('editPage',{tasks}))
    .catch(err => console.log(err))
})

//edit one page
router.get('/:id/edit',(req,res)=>{
  const id = req.params.id
  return Task.findById(id)
    .lean()
    .then(tasks => {
      res.render('edit',{tasks})
    })
    .catch(err => console.log(err))
})

//edit 
router.post('/:id',(req,res)=>{
  const editTask = req.body.editTask
  const id = req.params.id
  return Task.findByIdAndUpdate(id,{name:editTask})
    .then(task =>{
      res.redirect('/')
    })
    .catch(err => console.log(err))
})

//delete
router.post('/:id/delete',(req,res)=>{
  const id = req.params.id
  return Task.findByIdAndDelete(id)
    .then(()=>res.redirect('/'))
    .catch(err => console.log(err))
})


module.exports = router