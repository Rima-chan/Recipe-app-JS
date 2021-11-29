// Backend folder is a security layer to keep secret API key and sensitive infos
require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const port = process.env.PORT || 3000;
const recipe = require('./recipe/index');
const limiter = rateLimit({
    windowMs: 1000,
    max: 1
});

app.use(express.json());
app.use(helmet());
app.use(limiter);
app.use(cors());

app.use('/recipe', recipe);

app.listen(port, () => console.log(`App listening on port : ${port}`))