module.exports = {
        // Moved all mutation and query of the comment here
        author: async (comment, args, {models}) => {
                return await models.User.findById(comment.authorId);
        },
        note: async (comment, args, {models}) => {
                return await models.Note.findById(comment.noteId);
        }
};  