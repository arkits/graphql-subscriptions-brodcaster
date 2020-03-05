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
    brodcast: (_, payload, { pubsub }) => {
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
        console.log("Added new Subscriber!");
        return context.pubsub.asyncIterator(BRODCAST_POSITION);
      }
    }
  }
};

module.exports = {
  resolvers
};
