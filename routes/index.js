const express=require('express')
const routes=express.Router()
routes.use('/users',require('./users'))
routes.use('/posts',require('./posts'))
routes.use('/comments',require('./comments'))



module.exports=routes
