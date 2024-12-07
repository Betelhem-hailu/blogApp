const Action = require("../models/action");

const saveAction = async (actionType, postId, userId) => {
    try {
       // check if the action already exists in the database for this post for this user
        const actionExists = await checkAction(actionType, postId, userId);

        if (actionExists) {
            console.log('Action already exists');
            return;
        }
        // create a new action document
        const action = new Action({
            actionType,
            post: postId,
            user: userId,
        });
        
        await action.save();
        console.log('Action saved:', action);
        return;
    } catch (error) {
        console.error('Error saving action:', error);
        return;
    }
};

const checkAction = async (actionType, postId, userId) => {
    try {
        const existingAction = await Action.findOne({
            actionType,
            post: postId,
            user: userId,
        });
        return existingAction ? true : false;
    } catch (error) {
        console.error('Error checking action:', error);
        return false;
    }
};

module.exports = {saveAction, checkAction};