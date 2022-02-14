const express = require("express")
const app = express()

const {ApolloServer} = require("apollo-server-express")
const {typeDefs} = require("./Schema/typeDefs")
const {resolvers} = require("./Schema/resolvers")

let apolloServer
async function startServer() {
    apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        playground: true,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
}
startServer();

app.listen(3001, () => console.log("Server running on port 3001"))


