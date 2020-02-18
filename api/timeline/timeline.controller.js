const VideoTimeline = require('../video-timeline/video-timeline.model');
const AudioTimeline = require('../audio-timeline/audio-timeline.model');

exports.now = async (req, res) => {
    const dateNow = new Date();
    const query = {
        "startAt": { "$lte": dateNow },
        "endAt": { "$gte": dateNow }
    }
    let response = {};
    videoTimeline = await getVideo(query);
    if(videoTimeline) {
        let playVideoAt;
        playVideoAt = Math.round((new Date().getTime() - videoTimeline.startAt.getTime()) / 1000);
        let videoMedia = videoTimeline['media'];
        response['video'] = {
            id: videoMedia.id_player,
            player: videoMedia.player,
            playAt: playVideoAt
        }
    }
    audioTimeline = await getAudio(query);
    if(audioTimeline) {
        let playAudioAt;
        playAudioAt = Math.round((new Date().getTime() - audioTimeline.startAt.getTime()) / 1000);
        let audioMedia = audioTimeline['media'];
        response['video'] = {
            id: audioMedia.id_player,
            player: audioMedia.player,
            playAt: playAudioAt
        }
    }
    res.status(200).json(response);
}

getVideo = async query => {
    return new Promise((resolve, reject) => {
        VideoTimeline.findOne(query, (err, videoTimeline) => {
            if (err) {
                console.error('Error looking for video timeline', err);
                reject(err);
            }
            else resolve(videoTimeline);
        }).populate('media');
    });
}

getAudio = async query => {
    return new Promise((resolve, reject) => {
        AudioTimeline.findOne(query, (err, audioTimeline) => {
            if (err) {
                console.error('Error looking for audio timeline', err);
                reject(err);
            }
            else resolve(audioTimeline);
        }).populate('media');
    });
}