require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const recipe = require('./recipe/index');

app.use(express.json());

const whitelist = ['http://127.0.0.1', 'http://127.0.0.1:5500', 'http://localhost:3000', 'https://rima-chan.github.io', 'https://git.heroku.com/recipe-js.git'];
// const corsOptions = {
//     origin: (origin, callback) => {
//         if (!origin || whitelist.indexOf(origin) !== -1) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     methods: ['GET'],
//     optionsSuccessStatus: 200
// };
// const corsOptions = {
//     origin: 'https://rima-chan.github.io',
//     optionSuccessStatus: 200,
//     methods: 'GET'
// }

const corsOptionsDelegate = (req, callback) => {
    let corsOptions;
    let isDomainAllowed = whitelist.indexOf(req.header('Origin')) !== -1;
    if(isDomainAllowed) {
        corsOptions = {origin: true}
    } else {
        corsOptions = {origin: false}
    }
    callback(null, corsOptions)
}
app.use(cors(corsOptionsDelegate));

const limiter = rateLimit({
    windowMs: 1000,
    max: 1
});
app.use(limiter);
app.use('/recipe', recipe);
app.use('/recipe', (req,res) => res.json({success: 'ok'}))


app.listen(port, () => console.log(`App listening on port : ${port}`))