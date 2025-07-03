const Video = require('../models/Video');
const path = require('path');

const uploadVideo = async (req, res) => {
    try {
        const { title, description } = req.body;

        const videoFile = req.files?.video?.[0];
        const thumbnailFile = req.files?.thumbnail?.[0];

        if (!videoFile || !thumbnailFile || !title || !description) {
            return res.status(400).json({ message: "All fields are required (video, thumbnail, title, description)." });
        }

        const video = new Video({
            title,
            description,
            videoUrl: videoFile.path.replace(/\\/g, '/'),
            thumbnailUrl: thumbnailFile.path.replace(/\\/g, '/'),
            uploadedBy: req.user._id,
        });

        await video.save();

        res.status(201).json({
            message: 'Video uploaded successfully',
            video,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Video upload failed', error: err.message });
    }
};

const getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find()
            .populate('uploadedBy', 'username email')
            .sort({ createdAt: -1 });

        res.status(200).json(videos);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch videos', error: err.message });
    }
};

const getSingleVideo = async (req, res) => {
    try {
        const videoId = req.params.id;

        const video = await Video.findById(videoId).populate('uploadedBy', 'username email');
        if (!video) return res.status(404).json({ message: 'Video not found' });

        video.views += 1;
        await video.save();

        res.status(200).json(video);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch video', error: err.message });
    }
};

const getUserVideos = async (req, res) => {
    try {
        const userId = req.user.id;

        const videos = await Video.find({ uploadedBy: userId }).sort({ createdAt: -1 });

        res.status(200).json(videos);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch user videos', error: err.message });
    }
};

module.exports = {
    uploadVideo,
    getAllVideos,
    getSingleVideo,
    getUserVideos
};
