const mongoose = require('mongoose')

function ConnectDB(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
)

module.exports = ConnectDB;