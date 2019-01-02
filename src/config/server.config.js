
const defaultConfig = {
    PORT: process.env.PORT || 8080
};

const devConfig = {
    MONGO_URL: 'mongodb://localhost/startwars-dev'
};

const prodConfig = {
    MONGO_URL: process.env.MONGODB_URI || 'mongodb://localhost/startwars-prod'
};

const testConfig = {
    MONGO_URL: 'mongodb://localhost/startwars-test',
};

function getCurrentConfig(env) {
    if (env === 'development') {
        return devConfig;
    } else if (env === 'test') {
        return testConfig;
    }else if(env === 'production'){
        return prodConfig;
    }
}

export default {

    ...defaultConfig,
    ...getCurrentConfig(process.env.NODE_ENV)
};