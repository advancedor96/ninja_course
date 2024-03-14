const express = require('express')
const mongoose = require('mongoose');
// const cors = require('cors');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 3000;
// const Blog = require('./models/blogs');


// 從環境變數中取得 MongoDB 連線字串的帳號密碼
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;


const blogRoutes = require('./routes/blogRoute.js');
const dbURI = `mongodb+srv://${dbUser}:${dbPassword}@thefuckingclustername.pczmutf.mongodb.net/a0314?retryWrites=true&w=majority&appName=theFuckingClusterName`;
mongoose.connect(dbURI)
.then(res=> {
  console.log("已連到db");

})
.catch(err=> console.log('錯誤:', err))

app.use(express.json()); // 解析 JSON 請求主體
// app.use(cors());
app.use('/api', blogRoutes);

app.listen(port, () => {
  console.log(`server 監聽：${port}`);
});
