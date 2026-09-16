require('dotenv').config();
const express = require('express');
const app = express()
const PORT = process.env.PORT || 8000;
const cors = require('cors')
const ConnectDB = require('./ConnectDB/connect') 
const router = require('./Routes/routes')

const allowedOrigins = [
    'http://localhost:5173',
    'https://wyndecom01.vercel.app' // Your live Vercel frontend URL
];

const cors = require('cors');

app.use(cors({
    origin: true, // Automatically allows any frontend origin (localhost, Vercel previews, production)
    credentials: true
}));
const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/Wynd';
ConnectDB(dbURI)

//So that it executes first(before route)
app.use('/uploads', express.static('uploads'));
app.use(express.json())
app.use('/', router)

app.listen(PORT, () => {
    console.log("App Started!")
})