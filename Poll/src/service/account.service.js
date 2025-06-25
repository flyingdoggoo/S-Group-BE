import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import isValidRegister from '../validate/register.validate.js'
class AccountService{
    constructor()
    {
        this.user = User
    }
    async Login(username, password)
    {
        try
        {
            const user = await this.user.findOne({username: username})
            if(!user)
                throw new Error(`Không tìm thấy user ${username}`)
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch)
                throw new Error("Sai mật khẩu")
            const accessToken = jwt.sign({userId: user._id}, process.env.SECRET_KEY, {expiresIn: '60m'})
            const refreshToken = jwt.sign({userId: user._id}, process.env.SECRET_KEY, {expiresIn: '3d'})
            user.accessToken = accessToken
            user.refreshToken = refreshToken
            await user.save()
            console.log(accessToken)
            console.log(refreshToken)
            return user
        }
        catch(err)
        {
            throw new Error("Lỗi khi đăng nhập: " + err.message)
        }
    }
    async Register(user)
    {
        try
        {
            if(!isValidRegister(user.username, user.password))
            {
                throw new Error("Tài khoản hoặc mật khẩu không hợp lệ! ");
            }
            const findUser = await this.user.findOne({username: user.username})
            if(findUser)
                throw new Error(`username ${user.username} đã tồn tại`)
            const password = await bcrypt.hash(user.password, 10)
            const newUser = new this.user({
                ...user,
                password: password
            })
            const save = await newUser.save()
            return save
        }
        catch(error)
        {
            throw new Error("Lỗi khi đăng kí: " + error.message)
        }
    }
}
export default new AccountService()