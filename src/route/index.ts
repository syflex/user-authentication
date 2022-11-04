import express from 'express';
import AuthRoute from './user.route';


const router = express.Router();

/** Log the request */
router.use((req, res, next) => {
	/** Log the req */
	console.info(
		`Incoming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
	);

	res.on('finish', () => {
		/** Log the res */
		console.info(
			`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
		);
	});

	next();
});

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

/** Rules of our API */
router.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);

    
	if (req.method == 'OPTIONS') {
		res.header(
			'Access-Control-Allow-Methods',
			'PUT, POST, PATCH, DELETE, GET'
		);
		return res.status(200).json({});
	}

	next();
});

router.use(new AuthRoute().router);

router.get('/ping', (_, res) => res.send('pong'));

/** Error handling */
router.use((_, res) => {
	const error = new Error('Not found');

	console.error(error);

	res.status(404).json({
		message: error.message
	});
});

export default router;
