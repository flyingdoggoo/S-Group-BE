import express from 'express'
import UserController from '../../controllers/user.controller.js'
import {AuthenticateJWT} from '../../middlewares/user.authenticate.js'
const router = express.Router();

router.route('/')
    .get(AuthenticateJWT, UserController.GetAll)
    .post(AuthenticateJWT, UserController.Create)

router.route('/:id')
    .get(AuthenticateJWT, UserController.GetById)
    .put(AuthenticateJWT, UserController.Update)
    .delete(AuthenticateJWT, UserController.Delete)

router.route("/email").post(UserController.SendEmail)

router.route("/register")
    .post(UserController.Register)
router.route("/forgot-password")
    .post(UserController.ForgotPassword)
router.route("/reset-password")
    .post(AuthenticateJWT, UserController.ResetPassword)
router.route("/login")
    .post(UserController.Login);

export default router