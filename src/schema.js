const { gql } = require("apollo-server-express");
module.exports = gql`
  scalar DateTime
  type Note {
    id: ID!
    author: User!
    topics: [String!]!
    title: String!
    description: String!
    content: String!
    favoritedCount: Int!
    favoritedBy: [User!]
    unFavoritedCount: Int!
    unFavoritedBy: [User!]
    isLatex:Boolean!
    isHide: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    grade: String!
    comments: [Comment!]
    commentCount: Int!
  }
  type User{
    id: ID!
    name: String!
    username: String!
    email: String!
    notes: [Note!]!
    favorites: [Note!]!
    unfavorites: [Note!]!
    followed: [User!]
    following: [User!]
    createdAt: DateTime!
    isActive: Boolean!
  }
  type Comment{
    id: ID!
    note: Note
    author: User
    comment: String!
    likesBy:[User!]
    dislikesBy:[User!]
  }
  type Login{
    secret: String!
    isLogin: Boolean!
  }
  type Register{
    secret: String!
    isRegister: Boolean!
    isUsername: Boolean!
    isEmail: Boolean!
    code: String!
    status: String!
  }
  type Query {
    notes: [Note!]!
    note(id: ID!): Note
    user(id: ID!): User
    users: [User!]!
    myNote: [Note!]
    myData: User
    comments(noteId: ID!):[Comment!]
  }
  type Mutation {
    signUp(name:String!, username: String!, email: String!, password: String!): Register!
    signIn(username: String, email: String, password: String!): Login!
    newNote(
      topics: [String!],
      title: String!,
      description: String!,
      content: String!,
      isLatex: Boolean!,
      isHide: Boolean!
      grade: String!
      ): Note!
    updateNote(
      id: ID!,
      topics: [String!],
      title: String!,
      description: String!,
      content: String!,
      isLatex: Boolean!,
      isHide: Boolean!
      grade: String!
    ): Boolean!
    deleteNote(id: ID!): Boolean!
    addComment(noteId: String!, comment: String!): Comment!
    updateComment(id: ID!, comment: String!): Comment!
    deleteComment(id: ID!): Boolean!
    toggleFavorited(id: ID!): Note!
    toggleUnFavorited(id: ID!): Note!
  }
`;
 