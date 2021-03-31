module.exports = {
    // Moved all mutation and query of the note here
    author: async (note, args, {models}) => {
        return await models.User.findById(note.author);
    },
    favoritedBy: async (note, args, {models}) => {
        return await models.User.find({_id: {$in: note.favoritedBy}});
    },
    unFavoritedBy: async (note, args, {models}) => {
        return await models.User.find({_id: {$in: note.unFavoritedBy}});
    }
};