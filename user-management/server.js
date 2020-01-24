const mongoose = require('mongoose');
const app = require('./app');

const config = require('./configs/configs.js');

// Connect the database
mongoose.connect(config.db.url, config.db.options).then(con => {
    console.log('DB connection Successfully!');

}).catch(error => {
    console.log(`Unable to connect to database :: ${error.message}`);

    process.exit(1);
})

// Start the server
app.listen(config.app.port, () => {
    console.log(`Application is running on port ${config.app.port}`);
});

// handle uncaughtException 
process.on('uncaughtException', err => {
    console.log(`uncaught Exception!!! shutting down...${JSON.stringify(err.message)}`);

    process.exit(1);
});

//handle unhandledRejection
process.on('unhandledRejection', err => {
    console.log(`unhandled Rejection!!!  shutting down ...${JSON.stringify(err.message)}`);

    server.close(() => {

        process.exit(1);
    });
});