const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  // cloud_name: process.env.CLOUDINARY_NAME,
  // api_key: process.env.CLOUDINARY_KEY,
  // api_secret: process.env.CLOUDINARY_SECRET,

  cloud_name: 'dpxt8z9ah',
  api_key: '481982354154593',
  api_secret: 'aagNcBgCSd1cu9LAh1nL3w1O-d4',
});

const storage = new CloudinaryStorage({
  // cloudinary: cloudinary,
  cloudinary,
  params: {
    folder: 'starter',
    allowedFormats: ['jpg', 'png', 'jpeg'],
    public_id: (req, file) => file.originalname.split('.')[0],
  },
});

// storage: storage
const uploadCloud = multer({ storage });

module.exports = uploadCloud;
