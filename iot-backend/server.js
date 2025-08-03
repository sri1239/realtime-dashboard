const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sensorRoutes = require('./src/routes/sensorRoutes');
const graphqlRouter = require('./src/graphql/graphqlRouter');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

app.use(cors({
    origin: '*', 
    methods:['GET','POST','PUT','DELETE'],
    credentials: true
}));

app.use(express.json());
app.use('/api/sensor', sensorRoutes);
app.use('/graphql', graphqlRouter);
app.use('/api/auth', authRoutes);

module.exports = app;