const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const task = require('./modules/task')

router.use('/task',task)
router.use('/',home)

module.exports = router