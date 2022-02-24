const { AuthenticationError } = require('apollo-server-express');
const { User, Toys, Comments } = require("../models");
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
        },
        comments: async () => {
            return Comments.find({});
        }
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await user.findOne({ email });
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
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        addToy: async (parent, { name, price, imageURL, owner, description }) => {
            const toy = await Toys.create({ name, price, imageURL, owner, description });
            return toy;
        },
        removeToy: async (parent, { id }) => {
            const toy = await Toys.findOneAndDelete({ _id: id });
            return toy;
        },
        addComment: async (parent, { comment, owner, date }) => {
            const newComment = await Comments.create({ comment, owner, date });
            return newComment;
        }
    }
};

module.exports = resolvers;