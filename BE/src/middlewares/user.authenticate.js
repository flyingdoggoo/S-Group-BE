import jwt from "jsonwebtoken"
export const AuthenticateJWT = (req, res, next) => {
    // const bearerToken = req.headers["authorization"];
    // if(!bearerToken)
    // {
    //     return res.status(401).json({message: "Unauthorized"})
    // }
    // console.log("Bearer Token: ", bearerToken);
    // const token = bearerToken.split(" ")[1]
    // const decoded = jwt.verify(token, process.env.SECRET_KEY)
    // console.log("Decoded Token: ", decoded)
    // if(!token) {
    //     return res.status(401).json({ message: "Unauthorized" });
    // }
    // if(!decoded) {
    //     return res.status(401).json({ message: "Unauthorized" });
    // }
    // req.decoded = decoded
    // next()
}