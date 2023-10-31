const Media = require("../models/media");

exports.getAll = async (_, res) => {
    try {
        const media = await Media.find();
        res.status(200).json(media);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
};

exports.create = async (req, res) => {
    const { name } = req.body;
    let videosPaths = [];

    if (Array.isArray(req.files.videos) && req.files.videos.length > 0) {
        for (let video of req.files.videos) {
            // Backendurl/public/videos/file_name.mp4
            videosPaths.push("/" + video.path);
        }
    }

    try {
        const createdMedia = await Media.create({
            name,
            videos: videosPaths,
        });

        res.status(200).json({ message: "Media created sucessfully!", media: createdMedia });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
};
