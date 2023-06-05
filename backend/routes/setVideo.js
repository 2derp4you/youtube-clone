const router = require('express').Router();
const Video = require('../models/video');

router.get('/:id', async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        res.status(200).json(video);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/owner/:id', async (req, res) => {
    try {
        const videos = await Video.find({ ownerId: req.params.id });
        res.status(200).json(videos);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const videos = await Video.find();
        res.status(200).json(videos);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/upload', async (req, res) => {
    const newVideo = new Video(req.body);

    try {
        const video = await newVideo.save();
        res.status(200).json(video);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const video = await Video.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        });
        res.status(200).json(video);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Video.findByIdAndDelete(req.params.id);
        res.status(200).json('Video has been deleted...');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;