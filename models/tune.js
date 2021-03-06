const mongoose = require('mongoose');

const tuneSchema = mongoose.Schema({
  creator: {
    type: String,
    required: true
  },
  title: {
    type: String,
    require: true
  },
  composer: {
    type: String,
    require: true
  },
  origin: {
    type: String,
    require: true
  },
  meter: {
    type: String,
    require: true
  },
  type: {
    type: String,
    require: true
  },
  share: {
    type: Boolean,
    required: true
  },
  tempo: {
    type: Number,
    required: true
  },
  body: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('Tune', tuneSchema);