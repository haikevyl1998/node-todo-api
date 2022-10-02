const { PRIORITIES } = require('@/constants');
const mongoose = require('mongoose');
const Increment = require('./plugins/increment');
const ToJson = require('./plugins/toJson');

const groupSchema = new mongoose.Schema(
  {
    _id: { type: Number },
    userId: { type: Number, ref: 'users' },
    name: { type: String, required: true },
    description: { type: String },
    totalTask: { type: Number, default: 0 },
    priority: { type: String, enum: Object.values(PRIORITIES), default: PRIORITIES.MEDIUM },
    deletedAt: { type: Date, default: null },
  },
  {
    _id: false,
    timestamps: true,
  },
);

groupSchema.plugin(Increment, { name: 'groups' });
groupSchema.plugin(ToJson);

const Group = mongoose.model('groups', groupSchema);

module.exports = Group;
