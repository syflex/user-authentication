import express from 'express';
const app = express();

/** Routes */
// create a GET route
app.get('/', (req, res) => {
	res.send('Hello World!');
});


app.use((_, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'https://koyo-product-upload.netlify.app/');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});

export default app;