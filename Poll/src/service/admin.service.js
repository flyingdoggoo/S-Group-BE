import User from "../models/user.model.js"
import Poll from "../models/poll.model.js"

class AdminService{
    constructor(){
        this.user = User
        this.poll = Poll
    }
    async AddPoll(creatorId, poll)
    {
        try
        {
            const title = poll.title
            const isExist = await this.poll.findOne({title: title})
            const options = poll.options.map(option => ({
                text: option.text,
                votes: 0,
                userVote: []
            }))
            if(isExist)
                throw new Error(`Poll với title ${title} đã tồn tại`)

            const newPoll = new this.poll({
                title: poll.title,
                description: poll.description,
                options: options,
                creator: creatorId,
                votesCount: 0,
                isLocked: false
            })
            const saved = await newPoll.save()
            return saved
        }
        catch(err)
        {
            throw new Error("Lỗi khi tạo poll mới: " + err.message)
        }
    }
    async DeletePoll(pollId) {
        try
        {
            const poll = await this.poll.findById(pollId);
            if (!poll)
            {
                throw new Error(`Poll với id ${pollId} không tồn tại`);
            }

            const deletedPoll = await this.poll.findByIdAndDelete(pollId);
            
            return {
                message: "Xóa poll thành công",
                deletedPoll: deletedPoll
            };
        }
        catch (err)
        {
            throw new Error("Lỗi khi xóa poll: " + err.message);
        }
    }
    async GetAllUser()
    {
        const users = await this.user.find()
        return users
    }
    async DeleteUser(userId)
    {
        const user = await this.user.findByIdAndDelete({_id: userId})
        return user
    }
    async GetUserById(userId)
    {
        const user = await this.user.findById({_id: userId})
        return user
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
                                .populate("options.userVote", "username")
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
                                    .populate("options.userVote", "username")
            if(!findPoll)
                throw new Error(`Không tìm thấy poll có id là ${id}`)

            return findPoll
        }
        catch(err)
        {
            throw new Error("Lỗi khi tìm poll theo id " + err.message)
        }
    }
    async AddOption(text, pollId)
    {
        try
        {
            const poll = await this.poll.findById(pollId)
            if (!poll) {
            throw new Error(`Poll với id ${pollId} không tồn tại`);
            }
            const option = {
                text: text,
                votes: 0,
                userVote: []
            }
            poll.options.push(option)
            const saved = await poll.save()
            return saved
        }
        catch(err)
        {
            throw new Error("Lỗi khi AddOption " + err.message)
        }
        
    }
    async DeleteOption(optionId, pollId)
    {
        try
        {
            const poll = await this.poll.findById(pollId)
            if(!poll)
                throw new Error("Poll không tồn tại")
            const option = poll.options.id(optionId)
            if(!option)
                throw new Error("Option không tồn tại")
            poll.options.pull(optionId)
            const saved = await poll.save()
            return {
                poll: saved
            };
        }
        catch(err)
        {
            throw new Error("Lỗi khi DeleteOption " + err.message)
        }
    }
    async LockPoll(id)
    {
        try
        {
            const poll = await this.poll.findById({_id: id})
            if(!poll)
                throw new Error(`Không tìm thấy poll với id ${id}`)
            poll.isLocked = true
            const save = await poll.save()
            return save
        }
        catch(err)
        {
            throw new Error("Lỗi khi lock poll: " + err.message)
        }
    }
    async UnLockPoll(id)
    {
        try
        {
            const poll = await this.poll.findById({_id: id})
            if(!poll)
                throw new Error(`Không tìm thấy poll với id ${id}`)
            poll.isLocked = false
            const save = await poll.save()
            return save
        }
        catch(err)
        {
            throw new Error("Lỗi khi lock poll: " + err.message)
        }
    }
}

export default new AdminService()