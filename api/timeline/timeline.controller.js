const VideoTimeline = require('../video-timeline/video-timeline.model');
const AudioTimeline = require('../audio-timeline/audio-timeline.model');

exports.now = async (req, res) => {
    const dateNow = new Date();
    const query = {
        "startAt": { "$lte": dateNow },
        "endAt": { "$gte": dateNow }
    }
    const response = {};
    try {
        const videoTimeline = await getVideo(query);
    if(videoTimeline) {
        const playVideoAt = Math.round((new Date().getTime() - videoTimeline.startAt.getTime()) / 1000);
        let videoMedia = videoTimeline['media'];
        response['video'] = {
            id: videoMedia.id_player,
            player: videoMedia.player,
            playAt: playVideoAt
        }
    }
    const audioTimeline = await getAudio(query);
    if(audioTimeline) {
        const playAudioAt = Math.round((new Date().getTime() - audioTimeline.startAt.getTime()) / 1000);
        const audioMedia = audioTimeline['media'];
        response['video'] = { // audio?
            id: audioMedia.id_player,
            player: audioMedia.player,
            playAt: playAudioAt
        }
    }
    return res.status(200).json(response);
    } catch (error) {
        console.error('Error looking for medias', error);
        return res.status(500).send("Error looking for medias");
    }
}

async function getVideo(query) {
    try {
        const videoTimeline = await VideoTimeline.findOne(query).populate('media');
        return Promise.resolve(videoTimeline);
    } catch (error) {
        console.error('Error looking for video timeline', error);
        return Promise.reject(error);
    }
}

async function getAudio(query) {
    try {
        const audioTimeline = await AudioTimeline.findOne(query).populate('media');
        return Promise.resolve(audioTimeline);
    } catch (error) {
        console.error('Error looking for audio timeline', error);
        return Promise.reject(error);
    }
}