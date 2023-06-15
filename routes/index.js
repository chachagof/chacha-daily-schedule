const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const task = require('./modules/task')
const user = require('./modules/user')

router.use('/task',task)
router.use('/user',user)
router.use('/',home)

module.exports = router