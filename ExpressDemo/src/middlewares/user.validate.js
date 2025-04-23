import { ObjectId } from 'mongodb'; 

export const ValidateUserId = (req, res, next) => { 
    // const idString = req.params.id;

    // if (!ObjectId.isValid(idString)) {
    //     return res.status(400).json({ message: "Invalid User ID format" });
    // }
    next();
}