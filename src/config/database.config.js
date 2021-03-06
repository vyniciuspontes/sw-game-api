import mongoose from 'mongoose';
import configs from './server.config';

try {
    mongoose.connect(configs.MONGO_URL, { "useNewUrlParser": true })
} catch (err) {
    mongoose.createConnection(configs.MONGO_URL, { "useNewUrlParser": true });
}
mongoose.connection.once('open', () => { if (process.env.NODE_ENV !== 'test') console.log('MongoDB Running') }).on('error', e => {
    throw e;
});