const multer = require('multer');
const path = require('path');
const fs = require('fs');

const ensureDirExists = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadPath = 'uploads/others';
        if (file.mimetype.startsWith('video/')) {
            uploadPath = 'uploads/videos';
        } else if (file.mimetype.startsWith('image/')) {
            uploadPath = 'uploads/images';
        }

        ensureDirExists(uploadPath);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'video/mp4', 'video/mkv', 'video/avi',
        'image/jpeg', 'image/png', 'image/jpg', 'image/webp'
    ];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file format'), false);
    }
};

const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024 * 1024 // 10 GB
    },
    fileFilter
});

module.exports = upload;
