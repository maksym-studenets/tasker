const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
require('dotenv').config();
const { PORT, MONGODB_URI } = require('./config');
const errorHandler = require('./exceptions/error-handler');

const app = express();

const server = http.createServer(app);

mongoose.set('useCreateIndex', true);
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, autoReconnect: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use('/', express.static(__dirname + '/public'));
app.use('/api', routes);

app.use(errorHandler);

server.listen(PORT, () => {
    console.log(`App is listening on ${server.address().port}`);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error(`Unhandled rejection at: ${promise}`);
    console.error(`Reason: ${reason}`)
})
