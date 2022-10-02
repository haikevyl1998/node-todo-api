const { ROLES } = require('@/constants');
const mongoose = require('mongoose');
const Increment = require('./plugins/increment');
const bcryptjs = require('bcryptjs');
const ToJson = require('./plugins/toJson');

const userSchema = new mongoose.Schema(
  {
    _id: { type: Number },
    name: { type: String, request: true },
    username: { type: String, required: true, unique: true, loverCase: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(ROLES), default: ROLES.CONSUMER },
    deletedAt: { type: Date, default: null },
  },
  {
    _id: false,
    timestamps: true,
  },
);

const hidden = ['password'];

userSchema.plugin(Increment, { name: 'users' });
userSchema.plugin(ToJson, { hidden });

userSchema.pre('save', async function () {
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

userSchema.methods.isMatchedPassword = async function (pass) {
  return await bcryptjs.compare(pass, this.password);
};

userSchema.static('isTakenUsername', async function (username) {
  return !!(await this.findOne({ username }));
});

const User = mongoose.model('users', userSchema);

module.exports = User;
