const express = require('express')
const exphbs = require('express-handlebars')


const app = express();
const port = 3000;
const routes = require('./routes/index')

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
require('./config/mongoose')

app.engine('handlebars',exphbs.engine({defaultLayout:'main'}))
app.set('view engine','handlebars')
app.use(express.urlencoded({extended:true}))
app.use(routes)



app.listen(port,()=>{
  console.log(`Now is listen in ${port}`)
})