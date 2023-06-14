const corn = require('node-cron')
const Task = require('../models/schedule')

corn.schedule('0 0 * * *',()=>{
  Task.updateMany({},{done:false})
    .catch(err => console.log(err))
},{
  scheduled:true,
  timezone: "Asia/Shanghai"
})

module.exports = corn