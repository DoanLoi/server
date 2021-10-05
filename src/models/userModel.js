import mongoose from "mongoose";
import bcrypt from "bcrypt";
let Schema = mongoose.Schema;
let UserSchema = new Schema({
  username: {
    type: String,
    default: "User",
  },
  phone: String,
  email: String,
  password: String,
  avatar: {
    type: String,
    default: "https://blog.cpanel.com/wp-content/uploads/2019/08/user-01.png",
  },
});

UserSchema.statics = {
  findUserByIdForSessionToUse(id) {
    return this.findById(id).exec();
  },

  getListUser() {
    return this.find().exec();
  },

  createNew(item) {
    return this.create(item);
  },
  findByPhone(phone) {
    return this.findOne({ phone: phone }).exec();
  },
  removedById(id) {
    return this.findByIdAndRemove(id).exec();
  },
  verify(token) {
    return this.findOneAndUpdate(
      { verifyToken: token },
      { isActive: true, verifyToken: null }
    ).exec();
  },
  findByToken(token) {
    return this.findOne({ verify: token }).exec();
  },

  countUser() {
    return this.count();
  },
  changeProfile(id, user) {
    console.log(user);
    return this.findOneAndUpdate(
      { _id: id },
      { username: user.username, phone: user.phone }
    );
  },
  comparePassword(currentPass, newPass) {
    return bcrypt.compare(currentPass, newPass);
  },
  changePassword(id, newPass) {
    return this.findOneAndUpdate({ _id: id }, { password: newPass });
  },
};

UserSchema.methods = {
  comparePassword(password) {
    return bcrypt.compare(password, this.password); // return promise
  },
}; // tim duoc roi va ban ghi va so sanh mat khau cua ban ghi voi gia tri nh

module.exports = mongoose.model("user", UserSchema);
