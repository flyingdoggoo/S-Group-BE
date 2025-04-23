import User from '../models/user.model.js'
import { ObjectId } from 'mongodb'

class UserService{
    constructor()
    {
        this.user = User
    }
    async GetAll() {
        try
        {
            return await this.user.find();
        }
        catch(error)
        {
            throw new Error('Error while getting users: ' + error.message)
        }
    }
  
    async GetById(id) {
        try
        {
            const user = await this.user.findById(id)
            if(!user)
            {
                throw new Error("User not found")
            }
            return user
        }
        catch(error)
        {
            throw new Error("Error while find user by id: " + + error.message)
        }
    }
  
    async Create(user) {
        try
        {
            const newUser = new this.user(user)
            return await newUser.save()
        }
        catch(error)
        {
            throw new Error("Error while create new user: " + error.message)
        }
    }
  
    async Update(id, user) {
        try
        {
            const updateUser = this.user.findByIdAndUpdate(
                id,
                user,
                {new: true}
            )
            if(!updateUser)
            {
                throw new Error("User not found")
            }
            return updateUser;
        }
        catch(error)
        {
            throw new Error("Error while update user: " + + error.message)
        }
    }
  
    async Delete(id) {
        try{
            const deleteUser = this.user.findByIdAndDelete(id)
            if (!deleteUser) {
                throw new Error('User not found')
            }
            return deleteUser
        }
        catch(error)
        {
            throw new Error('Error while delete user: ' + + error.message)
        }
    }
}

export default new UserService()