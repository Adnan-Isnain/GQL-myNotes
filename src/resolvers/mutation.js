const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AuthenticationError} = require("apollo-server-express");
require("dotenv").config();


module.exports = {
    signUp: async (parent, {name, username, email, password}, {models}) => {
      let data = {
        secret: "",
        isRegister: false,
        isUsername: true,
        isEmail: true,
        code: "400",
        status: "username or email is already in use"
      }
      email = email.trim().toLowerCase();
      const findUser = await models.User.findOne({
        $or: [{email: email}, {username: username}]
      });

      if(findUser){
        return data;
      }    
      const passHashed = await bcrypt.hash(password, 10);
      try{
          const user = await models.User.create({
              name, username, email,
              password: passHashed
          });
          data =  {...data,
              secret: jwt.sign({id: user._id}, process.env.JWT_SECRET),
              isRegister: true,
              isUsername: false,
              isEmail: false,
              code: "200",
              status: "User created"
          }
          return data;
      } catch(e){
        return data;
      } 
  },
  signIn: async (parent, {username, email, password}, {models}) => {
      let data = {
        secret: "",
        isLogin: false
      }

      if(email){
          email = email.trim().toLowerCase();
      }

      const user = await models.User.findOne({
          $or: [{email: email}, {username: username}]
      });

      if(!user){
          return data;
      }

      const checkUser = await bcrypt.compare(password, user.password);
      if(!checkUser){
          return data;
      }

      data = {
        secret : jwt.sign({id: user._id}, process.env.JWT_SECRET),
        isLogin: true
      }
      return data;
  },
  newNote: async (parent, {title, topics, description, content, isLatex, isHide, grade}, { models, user }) => {
    if(!user){
      throw new AuthenticationError("You must be signed in to create a note");
    }
    return await models.Note.create({
      title, topics, description, content, isLatex, isHide, grade,
      author: mongoose.Types.ObjectId(user.id)
    });
  },
  deleteNote: async (parent, {id}, {models, user}) => {
      if(!user) {
        throw new AuthenticationError("You must be signed in to delete a note");
      }
      const note = await models.Note.findById(id);
      if(note && String(note.author) !== user.id) throw new AuthenticationError("You don't have permissions to delete the note");
      try{
          await note.remove();
          return true;
      } catch(err){
          return false;
      }
  },
  updateNote: async (parent, data, {models, user}) => {
    if (!user) {
      throw new AuthenticationError("You must be signed in to update a note");
    }
    const note = await models.Note.findById(data.id);
    if (note && String(note.author) !== user.id){
      throw new AuthenticationError("You don't have permissions to update the note");
    }
    const dataBaru = {...data};
    delete dataBaru.id;
    
    return !!await models.Note.findOneAndUpdate({_id: data.id}, dataBaru);
  },
  addComment: async(parent, data, {models, user}) => {
    if(!user) {
      throw new AuthenticationError("You must be signed in to adding new comment");
    }
    return await models.Comment.create({
      noteId: mongoose.Types.ObjectId(data.noteId), 
      authorId: mongoose.Types.ObjectId(user.id),
      comment: data.comment
    });
  },
  updateComment: async(parent, data, {models, user}) => {
    if(!user) {
      throw new AuthenticationError("You must be signed in to update comment");
    }
    const comment = await models.Comment.findById(data.id);
    if (comment && String(comment.author) !== user.id){
      throw new AuthenticationError("You don't have permissions to update the comment");
    }
    const commentBaru = {...data};
    delete commentBaru.id;
    
    return !!await models.Comment.findOneAndUpdate({_id: data.id}, commentBaru);
  },
  deleteComment: async (parent, {id}, {models, user}) => {
    if(!user) {
      throw new AuthenticationError("You must be signed in to delete a comment");
    }
    const comment = await models.Comment.findById(id);
    if(comment && String(comment.author) !== user.id) throw new AuthenticationError("You don't have permissions to delete the comment");
    try{
        await comment.remove();
        return true;
    } catch(err){
        console.log(err);
        return false;
    }
  },
  toggleFavorited: async (parent, {id}, {models, user}) => {
      if(!user) throw new AuthenticationError();

      // Check id and favorites
      let noteCheck = await models.Note.findById(id);
      const hasUser = noteCheck.favoritedBy.indexOf(user.id);

    //   if exist -> reduce favoritedCount by 1
    if(hasUser >= 0){
        return await models.Note.findByIdAndUpdate(
            id,
            {
                $pull: {
                    favoritedBy: mongoose.Types.ObjectId(user.id)
                },
                $inc:{
                    favoritedCount: -1
                }
            },
            {
                // Set new to true to return the updated doc
                new: true
            }
        );
    } else{
        return await models.Note.findByIdAndUpdate(
            id,
            {
                $push: {
                    favoritedBy: mongoose.Types.ObjectId(user.id)
                },
                $inc: {
                    favoritedCount: +1
                }
            },
            {
                new: true
            }
        );
    }
  },
  toggleUnFavorited: async (parent, {id}, {models, user}) => {
      if(!user) throw new AuthenticationError();

      // Check id and favorites
      let noteCheck = await models.Note.findById(id);
      const hasUser = noteCheck.unFavoritedBy.indexOf(user.id);

    //   if exist -> reduce favoritedCount by 1
    if(hasUser >= 0){
        return await models.Note.findByIdAndUpdate(
            id,
            {
                $pull: {
                    unFavoritedBy: mongoose.Types.ObjectId(user.id)
                },
                $inc:{
                    unFavoritedCount: -1
                }
            },
            {
                // Set new to true to return the updated doc
                new: true
            }
        );
    } else{
        return await models.Note.findByIdAndUpdate(
            id,
            {
                $push: {
                    unFavoritedBy: mongoose.Types.ObjectId(user.id)
                },
                $inc: {
                    unFavoritedCount: 1
                }
            },
            {
                new: true
            }
        );
    }
  },
};