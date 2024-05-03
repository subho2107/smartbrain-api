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
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

const db = knex({
    client: 'pg',
    connection: {
        user: 'smart_brain_r49o_user',
        password: process.env.DATABASE_PASSWORD,
        host: process.env.DATABASE_URL,
        database: 'smart_brain_r49o'
    }
});


app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res) => {res.send("success");})
app.post('/signIn', signIn.handleSignIn(db, bcrypt))
app.get('/profile/:id', profile.handleProfileGet(db))
app.put('/image', image.handleImage(db))
app.post('/register', register.handleRegister(db, bcrypt))
app.post('/imageUrl', (req, res) => {image.handleAPICall(req, res)})



app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})
