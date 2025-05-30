import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const Authenticate = (req, res, next) => {
    try
    {
        const bearerToken = req.headers["authorization"]

        if(!bearerToken)
            return res.status(401).json({message: "Không được phép truy cập"})

        const token = bearerToken.split(" ")[1]
        if (!token) {
            return res.status(401).json({message: "Token không hợp lệ"});
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        req.user = decoded

        next();
    }
    catch(err)
    {
        console.error("Lỗi ở Authenticate: ", err.message)
        return res.status(400).json({message: "Lỗi ở Authenticate"})
    }
    
}

export default Authenticate