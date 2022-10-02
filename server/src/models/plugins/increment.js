const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  counter: { type: Number, default: 0 },
});

const Counter = mongoose.model('counters', counterSchema);

const Increment = function (schema, { name }) {
  schema.pre('save', async function (next) {
    let currentCounter = await Counter.findOne({ name });
    if (!currentCounter) {
      currentCounter = await Counter.create({ name });
    }
    const newCounter = currentCounter.counter + 1;
    await Counter.findOneAndUpdate({ name }, { counter: newCounter });
    this._id = newCounter;
    next();
  });
};

module.exports = Increment;
