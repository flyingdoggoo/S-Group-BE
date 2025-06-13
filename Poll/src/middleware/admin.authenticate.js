import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/user.model.js'
dotenv.config()

const isAdmin = async (req, res, next) => {
    try
    {
        const bearerToken = req.headers["authorization"]

        if(!bearerToken)
            return res.status(401).json({message: "Không được phép truy cập"})

        const token = bearerToken.split(" ")[1]
        if (!token) {
            return res.status(401).json({message: "Token không hợp lệ"});
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decoded)
        const user = await User.findOne({_id: decoded.userId})
        if(user.role !== 'admin')
            return res.status(401).json({message: "Bạn đéo phải admin"})
        req.user = decoded;

        next();
    }
    catch(err)
    {
        console.error("Lỗi ở Authenticate Admin: ", err.message)
        return res.status(400).json({message: "Lỗi ở Authenticate Admin"})
    }
}

export default isAdmin