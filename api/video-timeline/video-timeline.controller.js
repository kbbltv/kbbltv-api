const VideoTimeline = require('./video-timeline.model');

module.exports = {
    list: async (req,res) => {
        const {start, end} = req.query;
        try {
            console.log('oi')
            const videoList = await VideoTimeline.find({startAt: { $gte: start, $lte: end }}).populate('media');
            return res.status(200).json(videoList);
        } catch (error) {
            console.error('Error looking for video timeline', error);
            return res.status(500).send("Some error has ocurred, but i dont give a shit.");
        }
    },
    create: async (req,res) => {
        try {
            await VideoTimeline.create(req.body);
            return res.status(201).json(req.body);
        } catch (error) {
            console.error('Error inserting a video in timeline', error);
            return res.status(500).send('Too drunk to do this maaan!');
        }
    }
}