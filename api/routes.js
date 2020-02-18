module.exports = app => {
    app.use('/api/auth', require('./authentication'));
    app.use('/api/media', require('./media'));
    app.use('/api/audio-timeline', require('./audio-timeline'));
    app.use('/api/video-timeline', require('./video-timeline'));
    app.use('/api/timeline', require('./timeline'));
    app.use('/api/youtube-data', require('./youtube-data'));
}