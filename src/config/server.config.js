
const defaultConfig = {
    PORT: process.env.PORT || 3000,
};

const devConfig = {
    MONGO_URL: 'mongodb://localhost/startwars-dev'
};

const testConfig = {
    MONGO_URL: 'mongodb://localhost/startwars-test',
};

function getCurrentConfig(env) {
    console.log('Current env ->', env);
    if (env === 'development') {
        return devConfig;
    } else if (env === 'test') {
        return testConfig;
    }
}

export default {

    ...defaultConfig,
    ...getCurrentConfig(process.env.NODE_ENV)
};