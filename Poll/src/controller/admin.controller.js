import AdminService from "../service/admin.service.js"
import AccountService from "../service/account.service.js"
class AdminController{
    async AddPoll(req, res, next)
    {
        try
        {
            const creatorId = req.user.userId
            // console.log(creatorId)
            const newPoll = req.body
            const poll = await AdminService.AddPoll(creatorId, newPoll)
            return res.status(201).json({
                message: "Tạo poll thành công",
                poll: poll
            })
        }
        catch(err)
        {
            next(err)
        }
    }
    async GetAllPoll(req, res, next)
    {
        try
        {
            const {page, limit} = req.query
            const allPolls = await AdminService.GetAllPoll(page, limit)
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
            const poll = await AdminService.GetPollById(id)
            if(!poll)
                return res.status(404).json({message: "Poll not found"})
            return res.status(200).json({
                message: "Thành công",
                poll: poll
            })
        }
        catch(err)
        {
            next(err)
        }
    }
    async DeletePoll(req, res, next)
    {
        try
        {
            const pollId = req.params.id;
            const adminId = req.user.userId;

            const result = await AdminService.DeletePoll(pollId, adminId);
            
            return res.status(200).json({
                message: result.message,
                poll: result.deletedPoll
            });
        }
        catch (error)
        {
            next(error);
        }
    }
    async GetAllUser(req, res, next)
    {
        try
        {
            const users = await AdminService.GetAllUser()
            if(!users)
                return res.status(500).json({message: "Lỗi khi GetAllUser"})
            return res.status(200).json({
                message: "Lấy thông tin tất cả user thành công",
                data: users
            })
        }
        catch(err)
        {
            next(err)
        }
    }
    async DeleteUser(req, res, next)
    {
        try
        {
            const id = req.params.id
            const user = await AdminService.DeleteUser(id)
            if(!user)
                return res.status(404).json({message: "Lỗi khi DeleteUser"})
            return res.status(200).json({
                message: "Xóa user thành công",
                data: user
            })
        }
        catch(err)
        {
            next(err)
        }
    }
    async GetUserById(req, res, next)
    {
        try
        {
            const id = req.params.id
            const user = await AdminService.GetUserById(id)
            if(!user)
                return res.status(404).json({message: "Lỗi khi GetUserById"})
            return res.status(200).json({
                message: "Get user thành công",
                data: user
            })
        }
        catch(err)
        {
            next(err)
        }
    }
    async CreateUser(req, res, next)
    {
        try
        {
            const user = req.body
            const newUser = await AccountService.Register(user)
            if(!newUser)
                return res.status(400).json({
                    message: "Tạo user thất bại"
                })
            return res.status(200).json({
                message: "Tạo user thành công",
                newUser
            })
        }
        catch(err)
        {
            next(err)
        }
    }
    async AddOption(req, res, next)
    {
        try
        {
            const pollId = req.params.pollId
            const text = req.body.text
            const result = await AdminService.AddOption(text, pollId)
            if(!result)
                return res.status(400).json({message: "Add option thất bại"})
            return res.status(400).json({
                message: "Add option thành công",
                data: result
            })
        }
        catch(err)
        {
            next(err)
        }
    }
    async DeleteOption(req, res, next)
    {
        try
        {
            const pollId = req.params.pollId
            const optionId = req.params.optionId
            const result = await AdminService.DeleteOption(optionId, pollId)
            if(!result)
                return res.status(400).json({message: "Delete option thất bại"})
            return res.status(400).json({
                message: "Delete option thành công",
                data: result
            })
        }
        catch(err)
        {
            next(err)
        }
    }
    async LockPoll(req, res, next)
    {
        try
        {
            const pollId = req.params.id
            const result = await AdminService.LockPoll(pollId)
            if(!result)
                return res.status(400).json({message: "LockPoll thất bại"})
            return res.status(200).json({
                message: "LockPoll thành công",
                data: result
            })
        }
        catch(err)
        {
            next(err)
        }
    }
    async UnLockPoll(req, res, next)
    {
        try
        {
            const pollId = req.params.id
            const result = await AdminService.UnLockPoll(pollId)
            if(!result)
                return res.status(400).json({message: "UnLockPoll thất bại"})
            return res.status(200).json({
                message: "UnLockPoll thành công",
                data: result
            })
        }
        catch(err)
        {
            next(err)
        }
    }
}
export default new AdminController()