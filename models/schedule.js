const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todo = new Schema({
  name:{
    type:String,
    require:true
  },
  done:{
    type:Boolean
  }
})