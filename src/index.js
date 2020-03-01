const { ApolloServer, PubSub } = require("apollo-server");

const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");

const SERVER_PORT = 8786;

const startServer = async () => {
  console.log("Starting Server...");

  const pubsub = new PubSub();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({
      req,
      res,
      pubsub
    })
  });

  server
    .listen(SERVER_PORT)
    .then(({ url }) => console.log(`Server started at ${url} 🙏`));
};

startServer();
