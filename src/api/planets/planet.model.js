import mongoose from 'mongoose';

const { Schema } = mongoose;

const planetModel = new Schema({
    name: { type: String, required: true },
    climate: { type: String, required: true },
    terrain: { type: String, required: true },
    movieAppearances: { type: Number, required: true },
});

export default mongoose.model('Planet', planetModel);