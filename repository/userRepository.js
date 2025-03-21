const User = require("../model/usersModel");

const registerUser = async (data) => {
    const user = new User(data);
    await user.save();
}

const getUserByEmail = async (email) => {
    return await User.findOne({ email }); 
}

const updateUser = async (id, data) => {
    return await User.findByIdAndUpdate(id, data, { new: true });
}

const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
}

module.exports = { registerUser, getUserByEmail, updateUser, deleteUser };