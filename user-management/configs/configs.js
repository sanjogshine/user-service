// config.js
const env = process.env.NODE_ENV || 'dev'; // 'dev' or 'test'

const dev = {
    app: {
        port: 3000
    },
    db: {
        url: 'mongodb://localhost:27017/',
        options: {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            autoIndex: false, // Don't build indexes
            reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
            reconnectInterval: 500, // Reconnect every 500ms
            poolSize: 10, // Maintain up to 10 socket connections
            // If not connected, return errors immediately rather than waiting for reconnect
            bufferMaxEntries: 0,
            connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            family: 4 // Use IPv4, skip trying IPv6
        }
    },
    sessionsConfigs: {
        jwtSecret: "jwtsecrethighlyconfidential",
        userSessionExpiryTimeInSeconds: 3000
    }
};

const prod = {
    app: {
        port: 3000
    },
    db: {
        url: 'mongodb://localhost:27017/',
        options: {
            sanjog: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            autoIndex: false, // Don't build indexes
            reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
            reconnectInterval: 500, // Reconnect every 500ms
            poolSize: 10, // Maintain up to 10 socket connections
            // If not connected, return errors immediately rather than waiting for reconnect
            bufferMaxEntries: 0,
            connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            family: 4 // Use IPv4, skip trying IPv6
        }
    },
    sessionsConfigs: {
        jwtSecret: "jwtsecrethighlyconfidential",
        userSEssionTimeInSeconds: 10
    }
};

const config = {
    dev,
    prod
};

module.exports = config[env];