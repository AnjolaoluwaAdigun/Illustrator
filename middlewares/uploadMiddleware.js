const multer = require('multer');
const fs = require('fs');
// Directory where files will be uploaded
const uploadDir = 'uploads/';

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir); // Set the upload destination
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Set the file name
    }
  });
  
const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } }); // Allow up to 5 images, each up to 10MB
module.exports=upload;
