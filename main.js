import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const app = express()

app.use(express.json())

app.route('/').get((req, res) => {
  res.send('Helládlo!')
})

const Port = 3000

app.listen(Port, (req, res) => {
  console.log(`Server is running on port ${Port}`)
})