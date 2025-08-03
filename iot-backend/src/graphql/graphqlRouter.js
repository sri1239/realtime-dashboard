const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const cors = require('cors');

const router = express.Router();

router.use(cors({
    origin: '*', 
    methods:['GET','POST','PUT','DELETE'],
    credentials: true
}));

router.use('/', graphqlHTTP({
  schema,
  graphiql: true
}));

module.exports = router;
