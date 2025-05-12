const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'StayWandererListing_Img', // folder name in Cloudinary
    allowed_formats: ['jpeg', 'png', 'jpg', 'webp'],
    transformation: [
      { width: 1024, crop: "limit" },          // Resize if larger
      { quality: "auto" },                     // Smart quality
      { fetch_format: "auto" }                 // Convert to modern format (WebP, etc.)
    ]
  }
});

module.exports = {
  cloudinary,
  storage
};
