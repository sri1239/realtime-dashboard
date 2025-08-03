const { GraphQLObjectType, GraphQLSchema, GraphQLFloat, GraphQLString, GraphQLList } = require('graphql');
const SensorData = require('../models/TempSensorData');

const SensorDataType = new GraphQLObjectType({
  name: 'SensorData',
  fields: () => ({
    id: { type: GraphQLString },
    temperature: { type: GraphQLFloat },
    humidity: { type: GraphQLFloat },
    powerUsage: { type: GraphQLFloat },
    timestamp: { type: GraphQLString },
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    sensorData: {
      type: new GraphQLList(SensorDataType),
      resolve() {
        return SensorData.find().sort({ timestamp: -1 }).limit(50);
      }
    }
  }
});

module.exports = new GraphQLSchema({ query: RootQuery });
