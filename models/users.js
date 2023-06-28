const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
  userName:{
    type:String,
    require:true
  },
  email:{
    type:String,
    require:true
  },
  password:{
    type:String,
    require:true
  },
  createAt:{
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User',User)