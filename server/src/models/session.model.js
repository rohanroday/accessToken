import mongoose from 'mongoose';

const sessionSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  refreshTokenHash: {
    type: String,
    required: true,
    trim: true,
  },
}, {timestamps: true});

const sessionModel = mongoose.model('Session', sessionSchema);

export default sessionModel;