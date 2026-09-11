const mongoose = require('mongoose')

function ConnectDB(url) {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

module.exports = ConnectDB;