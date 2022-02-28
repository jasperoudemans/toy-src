const { AuthenticationError } = require('apollo-server-express');
const { User } = require("../models");
const toysSchema = require("../models/Toys");
const { model } = require('mongoose');
const { signToken } = require('../utils/auth');

const Toys= model('Toys', toysSchema);

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
        // addComment: async () => {},
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
        removeToy: async (parent, { id }) => {
            const toy = await Toys.findOneAndDelete({ _id: id });
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
        }
    }
};

module.exports = resolvers;