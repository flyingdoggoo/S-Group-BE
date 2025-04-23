import userService from "../services/user.service.js"

const GetAll = async( req, res, next ) => {
    try {
        const users = await userService.GetAll()
        return res.status(200).json({
            data : users
        })        
    } catch (error) {
        next( error )
    }
}

const Post = async( req, res, next ) => {
    try {
        const body = req.body
        const user = await userService.Post( body )
        return res.status(201).json("Created")
    } catch (error) {
        next( error )
    }
}

const GetById = async( req, res, next ) => {
    try {
        const userId = req.params.id;
        const user = await userService.GetById(userId);
            return res.status(200).json({
                data : user
            })
        }
    catch (error) {
        next( error )
    }
}

const PutById = async( req, res, next ) => {
    try {
        const userId = req.params.id;
        const body = req.body
        console.log('Controller received raw ID:', userId, typeof userId); 
        console.log('Controller received body:', body);
        const user = await userService.PutById( userId, body )
        return res.status(200).json({
            data : user
        })
    } catch (error) {
        next( error )
    }
}

const DeleteById = async( req, res, next ) => {
    try {
        const userId = req.params.id;
        const users = await userService.DeleteById( userId )
        return res.status(200).json({
            data : users
        })
    } catch (error) {
        next( error )
    }
}

const GetByField = async( req, res, next ) => {
    try{
        const {field, value} = req.query
        const users = await userService.GetByField(field, value)
        return res.status(200).json({
            data : users
        })
    }
    catch (error) {
        next( error )
    }
}

export default {
    GetAll,
    Post,
    GetById,
    PutById,
    DeleteById,
    GetByField
}