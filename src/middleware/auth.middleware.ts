// JWT authention middleware
import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export default (req: any, res: any, next: NextFunction) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return res.status(401).send({ error: 'No token provided' });
	}

	const parts = authHeader.split(' ');
	if (parts.length !== 2) {
		return res.status(401).send({ error: 'Token error' });
	}

	const [scheme, token] = parts;
	if (!/^Bearer$/i.test(scheme)) {
		return res.status(401).send({ error: 'Token malformation' });
	}
  
	jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY as string, (err: any, decoded: any) => {
		if (err) {
			return res.status(401).send({ error: 'Token invalid' });
		}
		// eslint-disable-next-line no-cond-assign
		if (req.params.args = decoded.args){ 
			next();
		}
	});
};

