import accountRoute from './apis/account.route.js'
import adminRoute from './apis/admin.route.js'
import userRoute from './apis/user.route.js'
import defautRoute from './apis/default.route.js'
import Authenticate from '../middleware/user.authenticate.js'
import isAdmin from "../middleware/admin.authenticate.js"
import express from 'express'

const routes = express.Router()

routes.use("/", defautRoute)
routes.use("/auth", accountRoute)
routes.use("/user", Authenticate, userRoute)
routes.use("/admin", Authenticate, isAdmin, adminRoute)
routes.get("/test_api", (req, res) => {
    res.send("test ci cd")
})
export default routes