const { v4 } = require("uuid");

const BRODCAST_POSITION = "BRODCAST_POSITION";

const resolvers = {
  Query: {
    status: () => ({
      version: "0.0.1",
      serviceName: "Askari"
    })
  },
  Mutation: {
    brodcast: (_, payload, { pubsub, req }) => {

      console.log(`auth=${req.headers.authorization}`)

      const payloadPosition = {
        id: v4(),
        vehicleId: payload["vehicleId"],
        latitude: payload["latitude"],
        longitude: payload["longitude"]
      };

      pubsub.publish(BRODCAST_POSITION, {
        positionStream: payloadPosition
      });

      return {
        errors: [],
        position: payloadPosition
      };
    }
  },
  Subscription: {
    positionStream: {
      subscribe: (_, __, context) => {

        console.log("Subscribing! context=", context)

        return context.pubsub.asyncIterator(BRODCAST_POSITION) 
        
      }
    }
  }
};

module.exports = {
  resolvers
};
