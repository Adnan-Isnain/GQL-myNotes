module.exports = {
    // Moved all mutation and query of the user here
    notes: async (user, args, {models}) => {
        return await models.Note.find({author: user._id}).sort({_id: -1});
    },
    favorites: async (user, args, {models}) => {
        return await models.Note.find({favoritedBy: user._id}).sort({_id: -1});
    },
    unfavorites: async (user, args, {models}) => {
        return await models.Note.find({unFavoritedBy: user._id}).sort({_id: -1});
    },
};