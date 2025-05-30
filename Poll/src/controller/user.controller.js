import UserService from "../service/user.service.js";

class UserController{
    async Vote(req, res, next)
    {
        try
        {
            const pollId = req.params.pollId
            const optionId = req.body.optionId
            const voterId = req.user.userId
            const result = await UserService.Vote(pollId, optionId, voterId)
            if(!result)
                return res.status(500).json({message: "Vote thất bại"})
            return res.status(200).json({
                message: "Vote thành công",
                result
            })
        }
        catch(err)
        {
            next(err)
        }
    }
    async UnVote(req, res, next)
    {
        try
        {
            const pollId = req.params.pollId
            const optionId = req.body.optionId
            const voterId = req.user.userId
            const result = await UserService.UnVote(pollId, optionId, voterId)
            if(!result)
                return res.status(500).json({message: "Unvote thất bại"})
            return res.status(200).json({
                message: "UnVote thành công",
                result
            })
        }
        catch(err)
        {
            next(err)
        }
    }
}

export default new UserController()