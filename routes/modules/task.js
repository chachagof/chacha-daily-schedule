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
  const userId = req.user._id
  if(!newTask || newTask.trim() === ''){
    req.flash('warning_msg', 'Task is be required !')
    return res.redirect('task/new')
  }
  if(newTask.length > 30){
    req.flash('warning_msg',`Task can't name more than 30 characters`)
    return res.redirect('/task/new')
  }
  return Task.create({name:newTask.trim(),userId})
    .then(()=>res.redirect('/'))
    .catch(err => console.error(err))
})

//edit page
router.get('/edit',(req,res)=>{
  const userId = req.user._id
  return Task.find({ userId })
    .lean()
    .then(tasks => res.render('editPage',{tasks}))
    .catch(err => console.log(err))
})

//edit one page
router.get('/:id/edit',(req,res)=>{
  const _id = req.params.id
  const userId = req.user._id
  return Task.findOne({ _id,userId })
    .lean()
    .then(tasks => {
      res.render('edit',{tasks})
    })
    .catch(err => console.log(err))
})

//edit 
router.put('/:id',(req,res)=>{
  const editTask = req.body.editTask || null
  const done = req.body.done
  const id = req.params.id
  return Task.findById(id)
    .then(task =>{
      if(editTask){
        task.name = editTask
        return task.save()
      }
      if(done){
        task.done = done
        return task.save()
      }
    })
    .then(()=> res.redirect('/'))
    .catch(err => console.log(err))
})

//delete
router.delete('/:id',(req,res)=>{
  const id = req.params.id
  return Task.findByIdAndDelete(id)
    .then(()=>res.redirect('/task/edit'))
    .catch(err => console.log(err))
})



module.exports = router