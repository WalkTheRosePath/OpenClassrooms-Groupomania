// backend/middleware/multerMiddleware.js
// Middleware for handling file uploads using Multer

// Import the required modules
const multer = require("multer");

// Define MIME types and corresponding file extensions
const mimeTypes = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "audio/mpeg": "mp3",
  "video/mp4": "mp4",
};

// Configure storage settings for Multer
const storage = multer.diskStorage({
    // Specify destination directory for storing files
    destination: (req, file, callback) => {
        callback(null, 'uploads');
    },
    // Define filename format for uploaded files
    filename: (req, file, callback) => {
        // Replace spaces with underscores in the filename
        const name = file.originalname.split(' ').join('_');
        // Get file extension from MIME type
        const extension = mimeTypes[file.mimetype];
        // Set filename with unique timestamp to avoid overwriting existing files
        callback(null, name + Date.now() + '.' + extension);
    }
});

// Export Multer middleware configured with storage settings for single file uploads
module.exports = multer({ storage: storage }).single('media');
