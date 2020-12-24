const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const knex = require('knex')
const register = require('./controllers/register')
const signIn = require('./controllers/signIn')
const profile = require('./controllers/profile')
const image = require('./controllers/image')
const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'tirthankar',
        password: 'Sahasrar2107',
        database: 'smartbrain'
    }
});
db.select('*').from('users')
    .then(data => {
        console.log(data);
    });

app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res) => {res.send("success");})
app.post('/signIn', signIn.handleSignIn(db, bcrypt))
app.get('/profile/:id', profile.handleProfileGet(db))
app.put('/image', image.handleImage(db))
app.post('/register', register.handleRegister(db, bcrypt))
app.post('/imageUrl', (req, res) => {image.handleAPICall(req, res)})



app.listen(3000, () => {
    console.log("app is running on port 3000");
})