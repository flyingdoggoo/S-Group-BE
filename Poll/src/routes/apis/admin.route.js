import express from 'express'
import AdminController from "../../controller/admin.controller.js"
const router = express.Router()

router.route("/polls")
    .get(AdminController.GetAllPoll)
    .post(AdminController.AddPoll)

router.route("/polls/:id")
    .get(AdminController.GetPollById)
    .put(AdminController.LockPoll)
    .post(AdminController.UnLockPoll)
    .delete(AdminController.DeletePoll)

router.route("/polls/:pollId/options")
    .post(AdminController.AddOption)
router.route("/polls/:pollId/options/:optionId")
    .delete(AdminController.DeleteOption)   

router.route("/users")
    .get(AdminController.GetAllUser)
    .post(AdminController.CreateUser)

router.route("/users/:id")
    .get(AdminController.GetUserById)
    .delete(AdminController.DeleteUser)

export default router