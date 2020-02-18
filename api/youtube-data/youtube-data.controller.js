const request = require('request'),
    noembeded = process.env.noembeded;

exports.get = (req, res) => {
    let youtubeAddress = req.query.address;
    request(noembeded + youtubeAddress, (error, response, body) => {
        if (error) {
            console.error(error);
            res.status(500).json(error);
        } else {
            let data = {};
            try {
                let res = JSON.parse(body);
                let splitUrl = res.url.split("?v=");
                data.id = splitUrl[1];
                data.url = res.url;
                data.title = res.title;
                data.author_name = res.author_name;
                data.thumbnail_url = res.thumbnail_url;
            } catch(e) {
                console.error(e);
                res.status(500).send("Cannot convert this shit to a miserable json object.");
                return;
            }
            res.status(200).json(data);
        }
    })
}