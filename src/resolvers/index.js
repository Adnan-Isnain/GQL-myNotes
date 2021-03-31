const Query = require("./query");
const Mutation = require("./mutation");
const Note = require('./note');
const User = require('./user');
const Comment = require('./comment');
const { GraphQLDateTime } = require("graphql-iso-date");

module.exports = {
  Query,
  Mutation,
  Note,
  User,
  Comment,
  DateTime: GraphQLDateTime
};
