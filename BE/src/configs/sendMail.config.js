import nodemailer from 'nodemailer'
import { text } from 'express'
import dotenv from 'dotenv'
dotenv.config()
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
});

export const mailService = {
    async sendMail(
        {
            emailFrom,
            emailTo,
            emailSubject,
            emailText
        }
    )
    {
        const mailOptions = {
            from: emailFrom,
            to: emailTo,
            subject: emailSubject,
            text: emailText
        }
        return await transporter.sendMail(mailOptions)
    },
}

// export default mailService