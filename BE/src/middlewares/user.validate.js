import { ObjectId } from "mongodb";

const ValidateUserId = (req, res, next) =>
{
    const id = req.params.id
    if(!ObjectId.isValid(id))
    {
        return res.status(400).json({message: "Invalid UserId!"});
    }
    next()
}

export default ValidateUserId