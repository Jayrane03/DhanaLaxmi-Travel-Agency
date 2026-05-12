import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default:
        "https://loremflickr.com/800/500/travel",
    },

    description: {
      type: String,
      default: "",
    },

    pricePerPerson: {
      type: Number,
      required: true,
    },

    duration: {
      days: {
        type: Number,
        required: true,
      },

      nights: {
        type: Number,
        required: true,
      },
    },

    // ✅ NEW
    tourIncludes: {
      hotel: {
        type: Boolean,
        default: true,
      },

      meals: {
        type: Boolean,
        default: true,
      },

      flight: {
        type: Boolean,
        default: false,
      },

      sightseeing: {
        type: Boolean,
        default: true,
      },

      transport: {
        type: Boolean,
        default: true,
      },

      visa: {
        type: Boolean,
        default: false,
      },
    },

    // ✅ NEW
    tourHighlights: [
      {
        type: String,
      },
    ],

    // ✅ NEW
    tourManager: {
      type: String,
      default:
        "Professional tour manager included.",
    },

    placesCovered: [
      {
        type: String,
      },
    ],

    activities: [
      {
        type: String,
      },
    ],

    itinerary: [
      {
        day: Number,
        title: String,
        desc: String,
      },
    ],
  },

  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Package",
  packageSchema
);