const { models } = require("../models");
const { AuthenticationError} = require("apollo-server-express");


module.exports = {
  notes: async (parent, args, { models }) => {
    return await models.Note.find({$where: function(){return (this.isHide != true)} }).limit(100).sort({createdAt: -1});
  },
  note: async (parent, {id}, { models }) => {
    const noteData = await models.Note.findById(id);
    // const username = await models.User.findById(noteData.author);
    // console.log(username);
    return noteData;
  },
  user: async (parent, {id}, {models}) => {
    return await models.User.findById(id);
  },
  users: async (parent, args, {models, user}) => {
    if(!user) throw new AuthenticationError("You must be signed in to see all users");
    return await models.User.find({});
  },
  comments: async (parent, {noteId}, {models}) => {
      const comments = await models.Comment.find({noteId: noteId});
      console.log(comments);
      return comments;
  },
  myNote: async (parent, args, {models, user}) => {
    if(!user) throw new AuthenticationError("You must be signed in to see spesific author notes");
    const data = await models.Note.find({author: user.id});
    return data;
  },
  myData: async(parent, args, {models, user}) =>{
    if(!user) throw new AuthenticationError("There is no user login / signed in until now");
    const data = await models.User.findById(user.id);
    return data;
  }
}; 