const AudioTimeline = require('./audio-timeline.model');

exports.now = (req, res) => {
    const dateNow = new Date();
    const query = {
        "startAt": { "$lte": dateNow },
        "endAt": { "$gte": dateNow }
    }
    
    Media.find(query, (err, medias) => {
        if (err) {
            console.error('Error looking for medias', err);
            res.status(500).send("Error looking for medias");
        } else {
            let response = {};
            medias.forEach(media => {
                let platAt;
                playAt = Math.round((new Date().getTime() - media.startAt.getTime()) / 1000);
                if (!response[media.type]) {
                    response[media.type] = {
                        id: media.id,
                        player: media.player,
                        playAt: playAt
                    }
                }
            });
            res.status(200).json(response);
        }
    });
}