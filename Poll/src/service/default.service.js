import User from "../models/user.model.js"
import Poll from "../models/poll.model.js"
class DefaultService{
    constructor()
    {
        this.user = User
        this.poll = Poll
    }
    async GetAllPoll(page = 1, limit = 10)
    {
        try
        {
            const pageNum = parseInt(page)
            const limitNum = parseInt(limit)

            const skip = (pageNum - 1) * limitNum

            const polls = await this.poll.find()
                                .populate("creator", "username")
                                .select("-options.userVote")
                                .skip(skip)
                                .limit(limitNum)
            const total = await this.poll.countDocuments()
            const totalPages = Math.ceil(total/ limitNum)
            return {
                message: "success",
                data: polls,
                total: total,
                page: pageNum,
                totalPage: totalPages
            }
        }
        ///
        catch(err)
        {
            throw new Error("Lỗi khi GetAllPoll " + err.message)
        }
    }
    async GetPollById(id)
    {
        try
        {
            const findPoll = await this.poll.findOne({_id: id})
                                    .populate("creator", "username")
                                    .select("-options.userVote")
            if(!findPoll)
                throw new Error(`Không tìm thấy poll có id là ${id}`)

            return findPoll
        }
        catch(err)
        {
            throw new Error("Lỗi khi tìm poll theo id " + err.message)
        }
    }
}

export default new DefaultService()
