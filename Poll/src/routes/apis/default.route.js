import express from 'express'
import DefaultController from "../../controller/default.controller.js"
const router = express.Router()

router.route("/polls")
    .get(DefaultController.GetAllPoll)
router.route("/polls/:id")
    .get(DefaultController.GetPollById)
export default router