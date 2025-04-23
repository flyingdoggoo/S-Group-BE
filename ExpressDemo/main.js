import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import router from './src/routes/index.js';
import db from './src/database/mongodb.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use("/api", router);

const startServer = async() => {
    try {
        await db.connectDB();
        console.log("Kết nối tới MongoDB thành công");
    } catch (error) {
        console.error("Lỗi khi kết nối tới MongoDB:", error);
    }
}

startServer();
// app.get('/view-users', async (req, res, next) => {
//     const dbPath = pqath.join(__dirname, 'db.json');

//     try {
//         const fileContent = await fs.readFile(dbPath, 'utf8');
//         const jsonData = JSON.parse(fileContent);
//         const users = jsonData.User && Array.isArray(jsonData.User) ? jsonData.User : [];

//         res.render('data', {
//             pageTitle: 'Danh sách người dùng từ DB.json',
//             users: users
//         });

//     } catch (err) {
//         console.error("Lỗi khi đọc hoặc parse DB.json:", err);
//         next(err);
//     }

// });

// app.get('/', (req, res) => {
//     res.send(`
//         <h1>Chào mừng!</h1>
//         <p><a href="/view-users">Xem dữ liệu người dùng (View Engine)</a></p>
//         <p><a href="/my_page.html">Xem trang HTML tĩnh</a></p>
//         <p><a href="/images/my_image.jpg">Xem ảnh tĩnh</a></p>
//         <p><a href="/api">Truy cập API (ví dụ)</a></p>
//     `);
// });

// app.use((err, req, res, next) => {
//     console.error("Đã xảy ra lỗi:", err.stack);
//     res.status(500).json({
//         error: 'Internal Server Error'
//     });
// });

const Port = process.env.Port || 8000;

app.listen(Port, () => {
    console.log(`Server đang chạy tại http://localhost:${Port}`);
    // console.log(`Xem người dùng (View Engine): http://localhost:${Port}/view-users`);
    // console.log(`Trang HTML tĩnh: http://localhost:${Port}/my_page.html`);
    // console.log(`Ảnh tĩnh: http://localhost:${Port}/images/my_image.jpg`);
    // console.log(`API gốc: http://localhost:${Port}/api`);
});