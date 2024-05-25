const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../images')); // المجلد الذي سيتم تخزين الملفات فيه
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

const upload = multer({ storage: storage });

// api /upload
router.post('/upload', upload.single('image'), (req, res) => {
  // الحصول على رابط URL للصورة المرفوعة
 // const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  const imageUrl = " http://127.0.0.1:5500/backend/images/2023-11-28T14-35-34.662Z666.png"

  // إرجاع رابط الصورة كجزء من الاستجابة
  res.status(200).json({ message: 'image uploaded', imageUrl: imageUrl });
});

module.exports = router;









