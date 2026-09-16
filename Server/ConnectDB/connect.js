const mongoose = require('mongoose');
const dns = require('dns');

// Force Node.js to use public DNS to bypass local/cloud DNS blocks
dns.setServers(['1.1.1.1', '8.8.8.8']);

const ConnectDB = async (url) => {
    try {
        await mongoose.connect(url);
        console.log("MongoDB Connected Successfully!");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
    }
};

module.exports = ConnectDB;