const Clarifai = require('clarifai');
const app = new Clarifai.App({
    apiKey: '83eb99631b70413b93c19f8a798432e7'
});
const handleAPICall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => console.log("err"))
}
const handleImage = (db) => (req, res) => {
    const {id} = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => res.json(entries[0]))
        .catch()
}

module.exports = {
    handleImage,
    handleAPICall
}