import express from 'express'
import UserController from "../../controller/user.controller.js"
import DefaultController from '../../controller/default.controller.js'

const router = express.Router()

router.route("/polls")
    .get(DefaultController.GetAllPoll)
    
router.route("/polls/:id")
    .get(DefaultController.GetPollById)

router.route("/polls/:pollId/vote")
    .post(UserController.Vote)
    .delete(UserController.UnVote)

export default router