import express from 'express';
import router from './route';
const app = express();


/** Routes */
app.use('/api/', router);


app.use((_, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'https://koyo-product-upload.netlify.app/');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});

export default app;