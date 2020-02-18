const VideoTimeline = require('./video-timeline.model');

exports.list = async (req, res) => {
    let query = {
        startAt: { $gte: req.query['start'], $lte: req.query['end'] },
    }
    let videoList = await listVideos(query);
    res.status(200).json(videoList);
}

exports.create = (req, res) => {
    let timelineInsert = req.body;
    VideoTimeline.create(timelineInsert, (err, timelineInsert) => {
        if (err) {
            console.error('Error inserting a video in timeline', err);
            res.status(500).send('Too drunk to do this maaan!');
        }
        else res.status(201).json(timelineInsert);
    });
}

listVideos = async query => {
    return new Promise((resolve, reject) => {
        VideoTimeline.find(query, (err, videoTimeline) => {
            if (err) {
                console.error('Error looking for video timeline', err);
                reject(err);
            }
            else resolve(videoTimeline);
        }).populate('media');
    })
}