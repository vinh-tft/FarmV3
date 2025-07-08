const userRepos = require("../Repository/User.Repository");

const getAllUsers = async () => await userRepos.getAllUsers();
const getUser = async (id) => await userRepos.getUserById(id);
const updateUser = async (id, data) => await userRepos.updateUser(id, data);
const deleteUser = async (id) => await userRepos.deleteUser(id);

module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
};
