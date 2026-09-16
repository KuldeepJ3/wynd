require('dotenv').config();
const express = require('express');
const app = express()
const PORT = 8000;
const cors = require('cors')
const ConnectDB = require('./ConnectDB/connect') 
const router = require('./Routes/routes')

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

ConnectDB('mongodb://localhost:27017/Wynd')

//So that it executes first(before route)
app.use('/uploads', express.static('uploads'));
app.use(express.json())
app.use('/', router)

app.listen(PORT, () => {
    console.log("App Started!")
})