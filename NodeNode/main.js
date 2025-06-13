import express from 'express'
import mysql from 'mysql2/promise';
const app = express()
const port = 3000

const conn = await mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '123456',
  database: 'quanlysanbong_db',
});

app.get('/old', async (req, res) => {
try
{
        let totalTime = 0
        for(let i = 1; i <= 1000; i++)
        {
            const preTime = new Date().getTime();
            const connection = await mysql.createConnection({
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: '123456',
            database: 'quanlysanbong_db',
            });

            await connection.execute(
                'SELECT * FROM bookings',
            )
            const postTime = new Date().getTime();
            totalTime += (postTime - preTime)
            connection.destroy()
        }
        res.send(`Time executed: ${totalTime}ms`)
    }
    catch(err)
    {
        throw new Error("Error: " + err.message)
    }
})
app.get('/new', async (req, res) => {
try
{
        let totalTime = 0
        for(let i = 1; i <= 1000; i++)
        {
            const preTime = new Date().getTime();

            await conn.execute(
                'SELECT * FROM bookings',
            )
            const postTime = new Date().getTime();
            totalTime += (postTime - preTime)
        }
        res.send(`Time executed: ${totalTime}ms`)
    }
    catch(err)
    {
        throw new Error("Error: " + err.message)
    }
})



app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})