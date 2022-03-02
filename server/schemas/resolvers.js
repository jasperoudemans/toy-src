const { AuthenticationError } = require('apollo-server-express');
const { User, Toys } = require("../models");
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        users: async () => {
            return User.find({});
        },
        toys: async () => {

            return Toys.find({});
        }
    },
    Mutation: {
        addComment: async (parent, { id, comment, author }) => {
            await Toys.findOneAndUpdate(
                { _id: id },
                {
                    $push: {
                        comments: { comment, author }
                    }
                }
            )
            return { comment, author }
        },
        removeComment: async (parent, { id, index }) => {
            const $unset = {}
            $unset['comments.' + index] = 1
            const toy = await Toys.findOneAndUpdate(
                { _id: id },
                { $unset }
            )
            // remove null comments entries
            await Toys.findOneAndUpdate(
                { _id: id },
                { $pull: { comments: null } }
            )
            return toy
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('No user with this email found!');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect password!');
            }
            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, { username, email, password, location }) => {
            const user = await User.create({ username, email, password, location });
            const token = signToken(user);
            return { token };
        },
        addToy: async (parent, { name, price, imageURL, owner, description }) => {
            const toy = await Toys.create({ name, price, imageURL, owner, description });
            return toy;
        },
        editUser: async (parent, { username, location }, context) => {
            const userdata = await User.findById(context.user._id);
            if (!userdata) {
                throw new AuthenticationError('Unable to get user data for editing user');
            }
            const result = await Toys.updateMany(
                { owner: userdata.username },
                { owner: username }
            );
            if (!result) {
                throw new AuthenticationError('Unable to update toy listings to new name');
            }
            const user = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $set: { username: username, location: location } });
            return user;
        },
        removeToy: async (parent, { _id }) => {
            const toy = await Toys.findOneAndDelete({ _id: _id });
            return toy;
        },
        lowerReputation: async (parent, { username }, context) => {
            const data = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $push: { reviewedUsers: username } }
            );
            if (!data) {
                throw new AuthenticationError('Unable to update user');
            }
            const user = await User.findOneAndUpdate(
                { username: username },
                { $inc: { reputation: -1 } }
            );
            return user;
        },
        increaseReputation: async (parent, { username }, context) => {
            const data = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $push: { reviewedUsers: username } }
            );
            if (!data) {
                throw new AuthenticationError('Unable to update user');
            }
            const user = await User.findOneAndUpdate(
                { username: username },
                { $inc: { reputation: +1 } }
            )
            return user;
        },
        checkComment: async (parent, { toyID, commentID, comment, author }, context) => {
            const data = await Toys.findOneAndUpdate(
                { _id: toyID },
                { $pull: { comments: { _id: commentID } } }
            );
            if (!data) {
                throw new AuthenticationError('Unable to delete checked comment');
            }
            const result = await Toys.findOneAndUpdate(
                { _id: toyID },
                {
                    $push: {
                        comments: {
                            comment: comment,
                            author: author,
                            checked: true
                        }
                    }
                }
            );
            return result ? true : false
        }
    }
};

module.exports = resolvers;