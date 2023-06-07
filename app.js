const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

const app = express()
const port = 3000

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URL)
const db = mongoose.connection
db.on('error',()=>{
  console.log('mongodb error!!')
})
db.once('open',()=>{
  console.log('mongodb connected')
})

app.engine('handlebars',exphbs.engine({defaultLayout:'main'}))
app.set('view engine','handlebars')

app.get('/',(req,res)=>{
  res.render('index')
})

app.listen(port,()=>{
  console.log(`Now is listen in ${port}`)
})