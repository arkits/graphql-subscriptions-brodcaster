const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    status: Status!
  }

  type Status {
    version: String!
    serviceName: String!
  }

  type Error {
    field: String!
    message: String!
  }

  type Position {
    id: ID!
    vehicleId: String!
    latitude: Float!
    longitude: Float!
  }

  type BrodcastResponse {
    errors: [Error!]!
    position: Position!
  }

  type Mutation {
    brodcast(
      vehicleId: String!
      latitude: Float!
      longitude: Float!
    ): BrodcastResponse
  }

  type Subscription {
    positionStream: Position!
  }
`;

module.exports = {
  typeDefs
};
