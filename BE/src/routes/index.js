import express from 'express'
import userRouter from './apis/user.route.js'

const routes = express.Router()

routes.use('/users', userRouter)

export default routes