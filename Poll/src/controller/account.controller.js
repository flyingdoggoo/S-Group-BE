import accountService from "../service/account.service.js";

class AccountController{
    async Login(req, res, next)
    {
        try
        {
            const user = req.body
            const existUser = await accountService.Login(user.username, user.password)
            if(!existUser)
                return res.status(401).json({message: "Sai username hoặc password"})
            return res.status(200).json({
                message: "Đăng nhập thành công",
                user: existUser
            })
        }
        catch(err)
        {
            next(err)
        }
    }
    async Register(req, res, next)
    {
        try
        {
            const newUser = req.body
            const result = await accountService.Register(newUser)
            if(!result)
                return res.status(400).json({
                    message: "Đăng ký thất bại"
                })
            return res.status(200).json({
                message: "Đăng ký thành công",
                result
            })
        }
        catch(err)
        {
            next(err)
        }
    }
}

export default new AccountController()