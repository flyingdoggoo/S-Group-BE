import express from 'express'
import AccountController from "../../controller/account.controller.js"
const router = express.Router()

router.route("/login")
    .post(AccountController.Login)

router.route("/register")
    .post(AccountController.Register)

export default router