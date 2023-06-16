const express = require('express')
const exphbs = require('express-handlebars')
const flash = require('connect-flash')
const session = require('express-session')
const usePassport = require('./config/passport')

const app = express();
const port = 3000;
const routes = require('./routes/index')

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
require('./config/mongoose')
require('./helper/nodeCorn')

app.engine('handlebars',exphbs.engine({defaultLayout:'main'}))
app.set('view engine','handlebars')
app.use(session({ secret:process.env.SECRET,resave:false,saveUninitialized:true}))
usePassport(app)
app.use(flash())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.use((req,res,next)=>{
  res.locals.user = req.user
  res.locals.warning_msg = req.flash('warning_msg') 
  next()
})

app.use(routes)

app.listen(port,()=>{
  console.log(`Now is listen in ${port}`)
})