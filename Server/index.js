require('dotenv').config();
const express = require('express');
const app = express()
const PORT = 8000;
const cors = require('cors')
const ConnectDB = require('./ConnectDB/connect') 
const router = require('./Routes/routes')

const allowedOrigins = [
    'http://localhost:5173',
    'https://wyndecom01.vercel.app' // Your live Vercel frontend URL
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
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