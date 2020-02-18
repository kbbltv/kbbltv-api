const Media = require('./media.model');

exports.create = async (req, res) => {
    let media = req.body;
    try {
        let mediaInsert = await insertMedia(media);
        res.status(201).json(mediaInsert);
    } catch(e) {
        console.error(e);
        res.status(500).send("Some error has ocurred, but i dont give a shit.");
    }
    
}

exports.search = async (req, res) => {
    let page = req.query.page;
    let reqQuery = req.query;
    let query = {};
    if (reqQuery.search) {
        let search = reqQuery.search;
        query = {
            $or: [
                { name: new RegExp(search, 'gi') },
                { address: search },
                { id_player: search },
            ]
        }
    }
    let limit = 24;
    res.status(200).json(await paginateMedias(query, page, limit));
}

exports.get = async (req, res) => {
    let query = req.query;
    let media = await getMedia(query);
    if(media) {
        res.status(404).send("Media not found, are you retard?");
    } else {
        res.status(200).json(media);
    }
}

insertMedia = async media => {
    return new Promise((resolve, reject) => {
        Media.create(media, (err, media) => {
            if(err) {
                // console.error(err);
                reject(err);
            }
            else resolve(media);
        });
    });
}

getMedia = async query => {
    return new Promise((resolve, reject) => {
        Media.findOne(query, (err, media) => {
            if(err) {
                console.error(err);
                reject(err);
            }
            else resolve(media);
        });
    });
}

listMedia = async query => {
    return new Promise((resolve, reject) => {
        Media.find(query, (err, medias) => {
            if(err) {
                console.error(err);
                reject(err);
            }
            else resolve(medias);
        });
    });
}

paginateMedias = async (query, page, limit) => {
    return new Promise((resolve, reject) => {
        Media.paginate(query, {
            page: page,
            limit: limit
        }, (err, result) => {
            if(err) {
                console.error(err);
                reject(err);
            }
            else resolve(result);
        });
    });
}