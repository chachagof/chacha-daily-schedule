const mongoose = require('mongoose')
const Schema = mongoose.Schema
const task = new Schema({
  name:{
    type:String,
    require:true
  },
  done:{
    type:Boolean,
    default:false
  },
  userId:{
    type:Schema.Types.ObjectId,
    ref:'User',
    index:true,
    require:true
  }
})

module.exports = mongoose.model('Task',task)