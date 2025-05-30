import DefaultService from "../service/default.service.js"

class DefaultController{
    async GetAllPoll(req, res, next)
    {
        try
        {
            const {page, limit} = req.query
            const allPolls = await DefaultService.GetAllPoll(page, limit)
            if(!allPolls)
                return res.status(500).json({message: "Lỗi khi GetAllPoll"})
            return res.status(200).json({
                message: "Lấy tất cả poll thành công",
                data: allPolls
            })
        }
        catch(err)
        {
            next(err)
        }
    }
    async GetPollById(req, res, next)
    {
        try
        {
            const id = req.params.id
            const poll = await DefaultService.GetPollById(id)
            if(!poll)
                return res.status(404).json({message: "Poll not found"})
            return res.status(200).json({
                message: "Lấy thông tin poll thành công",
                poll: poll
            })
        }
        catch(err)
        {
            next(err)
        }
    }
}
export default new DefaultController()