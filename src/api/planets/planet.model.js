import mongoose from 'mongoose';

const { Schema } = mongoose;

const planetModel = new Schema({
    name: String,
    climate: String,
    terrain: String,
    movieAppearances: Number
});

export default mongoose.model('Planet', planetModel);