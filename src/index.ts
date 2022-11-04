import http from 'http';
import { config } from './config/config';
import app from './app';
import MongoConnection from './utile/database';
import swaggerUi from 'swagger-ui-express';
import { apiDocumentation } from './docs/apidoc';

/** Connect to Mongo */
const mongoConnection = new MongoConnection(config.mongo.url);
if (config.mongo.url == null) {
	console.info('Mongo URL is not set. Server will not start.');
	process.exit(1);
}

// Start Server
mongoConnection.connect(() => {
	StartServer();
});

/** Only Start Server if Mongoose Connects */
const StartServer = () => {   
	http.createServer(app).listen(config.server.port, () => console.info(`Server is running on port ${config.server.port}`));
};



// start swagger
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(apiDocumentation));