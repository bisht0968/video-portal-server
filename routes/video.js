const express = require('express');
const router = express.Router();
const { uploadVideo, getAllVideos, getSingleVideo, getUserVideos } = require('../controllers/videoController');
const protect = require('../middleware/authMiddleware');
const upload = require('../middleware/multerConfig');

router.post(
    '/upload',
    protect,
    upload.fields([
        { name: 'video', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 }
    ]),
    uploadVideo
);


router.get('/getAllVideos', getAllVideos);

router.get('/:id', getSingleVideo);

router.get('/user/dashboard', protect, getUserVideos);

module.exports = router;
