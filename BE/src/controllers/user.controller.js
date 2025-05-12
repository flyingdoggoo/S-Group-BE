import userService from "../services/user.service.js";
import  {mailService} from "../configs/sendMail.config.js"
class UserController{
    async SendEmail(req, res, next)
    {
      try{
        const email = req.body.email
        const mailOptions = {
          emailFrom: "testEmail@gmail.com",
          emailTo: email,
          emailSubject: "SUPANIGA",
          emailText: "This is a test email"
        }
        const result = await mailService.sendMail(mailOptions);
        if(!result)
        {
          return res.status(404).json({message: "error while sending mail"});
        }
        return res.status(200).json({message: "Sent!"});
      }
      catch(error)
      {
        throw new Error("Error: " + error)
      }
    }
    async Login(req, res, next)
    {
      try
      {
        const data = req.body
        if(!data)
        {
          return res.status(400).json({message: "invalid input"});
        }
        console.log(data)
        const token = await userService.Login(data);
        return res.status(201).json({
          message: "Login success!",
          token: token
        })
      }
      catch(error)
      {
        // res.status(404).json({message: "Error while loginasd!"});
        throw new Error("Error while login: " + error.message)
      }
    }
    async Register(req, res, next)
    {
      try
      {
        const data = req.body
        const newUser = await userService.Register(data);
        if(!newUser)
        {
          return res.status(404).json({message: "Error while registering123!"});
        }
        return res.status(201).json({message: "Register success!"})
      }
      catch(error)
      {
        next(error);
      }
    }
    async GetAll(req, res, next)
    {
        try
        {
            const users = await userService.GetAll();
            return res.status(200).json({ data: users})
        }
        catch(error)
        {
            throw new Error("Error while getting users: " + error.message);
            // next(error)
        }
    }
    async GetById(req, res, next)
    {
        try
        {
            const id = req.params.id
            const user = await userService.GetById(id)
            if(!user)
            {
                return res.status(404).json('Not Found')
            }
            return res.status(200).json({data: user})
        }
        catch(error)
        {
            next(error)
        }
    }
    async Create(req, res, next) {
        try {
          const body = req.body
          const newUser = await userService.Create(body)
          if (!newUser) {
            return res.status(400).json("Bad Request")
          }
          return res.status(201).json({ data: newUser })
        } catch (error) {
          next(error)
        }
      }
    
    async Update(req, res, next) {
      try {
        const id = req.params.id
        const body = req.body
        const updatedUser = await userService.Update(id, body)
        if (!updatedUser) {
          return res.status(404).json("Not Found")
        }
        return res.status(200).json("Updated Successfully")
      } catch (error) {
        next(error)
      }
    }
  
    async Delete(req, res, next) {
      try {
        const id = req.params.id
        const deleted = await userService.Delete(id)
        if (!deleted) {
          return res.status(404).json("Not Found")
        }
        return res.status(200).json("Deleted Successfully")
      } catch (error) {
        next(error)
      }
    }
    async ForgotPassword(req, res, next)
    {
      const email = req.body.email
      try
      {
        const result = await userService.ForgotPassword(email)
        if(!result)
        {
          return res.status(404).json({message: "not found"});
        }
        return res.status(200).json({message:"success sending reset password request"})
      } 
      catch(error)
      {
        throw new Error("Error while sending reset pw request!: Error: " + error.message)
      }    
    }
    async ResetPassword(req, res, next){
      try
      {
        const otp = req.body.otp
        const email = req.body.email
        const password = req.body.password
        if(!password)
        {
          return res.status(400).json({message:"Missing password"})
        }
        const result = await userService.ResetPassword(otp, email, password);
        if(!result)
        {
          return res.status(404).json({message:"Error resetting password"})
        }
        return res.status(200).json({message:"Password reset successfully", data: result})
      }
      catch (error) {
        next(error);
      }
  
    }
  }


export default new UserController()