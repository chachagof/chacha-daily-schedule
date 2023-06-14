const mongoose = require('mongoose')
const Task = require('../models/schedule')
const corn = require('node-cron')

mongoose.connect(process.env.MONGODB_URL)

const db = mongoose.connection

db.on('error',()=>{
  console.log('mongodb error!!')
})
db.once('open',()=>{
  corn.schedule('5 * * * * *',()=>{
  Task.updateMany({},{done:false})
  })
  console.log('mongodb connected')
})

module.exports = db