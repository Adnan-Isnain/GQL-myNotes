// Installing Packages
const express = require("express");
const app = express();

const {ApolloServer} = require("apollo-server-express")
const db = require("./src/db");

const models = require("./src/models");
const typeDefs = require("./src/schema");
const resolvers = require("./src/resolvers");


// Using and connecting mongodb
require("dotenv").config();
const DB_HOST = process.env.DB_LOCAL;
db.connect(DB_HOST);

// Setting Port
const port = process.env.PORT || 5000;

// JWT Setting
const jwt = require("jsonwebtoken");

// Get validity with JWT
const getUser = (token) => {
  if(token){
    try{
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch(e){
      throw new Error("Session Invalid");
    }
  }
};

// Setting Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => {
          // Getting user token --> in header
          const token = req.headers.authorization;
          // Get validity token
          const user = getUser(token);
          return {models, user};
        }
})
server.applyMiddleware({ app, path: "/api" });

app.listen(port, () => {
    console.log(
      `Server berjalan pada halaman http://localhost:${port}${server.graphqlPath}`
    );
  });