const multer = require('multer')
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(req.file);
        cb(null, path.join(__dirname, '../uploads'))
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname
        cb(null, uniqueName + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage })

module.exports = upload