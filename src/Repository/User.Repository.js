const users = require("../Models/User.Model")

console.log("User model loaded:", typeof User);

const getAllUsers = () => users.find();
const getUserById = (id) => users.findOne({ userId: id });
const updateUser = (id, data) => users.findOneAndUpdate({ userId: id }, data, { new: true });
const deleteUser = (id) => users.findOneAndDelete({ userId: id });

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
