const mongoose = require('mongoose')


const listSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  reviews: {
    type: Number,
    required: true,
    min: 0
  },
  price_per_night: {
    type: Number,
    required: true
  },
  details: {
    guests: {
      type: Number,
      required: true,
      min: 1
    },
    bedrooms: {
      type: Number,
      required: true,
      min: 0
    },
    bathrooms: {
      type: Number,
      required: true,
      min: 0
    },
    dedicated_workspace: {
      type: Boolean,
      required: true
    },
    self_checkin: {
      type: Boolean,
      required: true
    },
    free_cancellation: {
      type: Boolean,
      required: true
    }
  },
  host: {
    name: {
      type: String,
      required: true
    },
    joined: {
      type: String,
      required: true
    }
  },
  description: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    required: true
  }
});

const List = mongoose.model('list',listSchema);

module.exports = List;