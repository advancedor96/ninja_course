const express = require('express')
const session = require('express-session');
// const MemoryStore = require('memorystore')(session);
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoute.js');
const cors = require('cors');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 3000;
// const Blog = require('./models/blogs');

app.use(
  session({
    secret: 'cat',
    resave: false,
    // name: 'myUUUUser',
    // cookie: { maxAge : 60000},
    saveUninitialized: false,
    // store: new MemoryStore({
    //   checkPeriod: 86400000 // prune expired entries every 24h
    // }),
  })
);


// 從環境變數中取得 MongoDB 連線字串的帳號密碼
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;


const dbURI = `mongodb+srv://${dbUser}:${dbPassword}@thefuckingclustername.pczmutf.mongodb.net/a0314?retryWrites=true&w=majority&appName=theFuckingClusterName`;
mongoose.connect(dbURI)
.then(res=> {
  console.log("已連到db");

})
.catch(err=> console.log('錯誤:', err))

app.use(express.json()); // 解析 JSON 請求主體

const corsOptions = {
  origin: ['http://localhost:5173', "https://ninja-course-ui.onrender.com"], // 允許的來源
  credentials: true, // 允許發送 Cookie
};

app.use(cors(corsOptions));
app.use('/api', blogRoutes);

app.listen(port, () => {
  console.log(`server 監聽：${port}`);
});
