const User = require("../Models/User.Model");
const Counter = require("../Models/Counter.Model");

exports.findByEmail = async (email) => {
    return await User.findOne({ email });
};

exports.createUser = async (data) => {
    const counter = await Counter.findOneAndUpdate(
        { id: "userId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );

    data.userId = counter.seq;

    const user = new User(data);
    return await user.save();
};