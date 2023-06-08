const Task = require('../schedule')
if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const db = require('../../config/mongoose')

db.once('open',()=>{
  for(let i = 0;i < 10;i ++){
    Task.create({name:`task${i}`,done:false})
  }
  console.log('Seed is created')
})