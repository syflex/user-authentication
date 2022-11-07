// JWT authention middleware
import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { config } from '../config/config';


export default (req: Request, res: Response, next: NextFunction) => {
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
	
	const secret = config.jwt.secret;
	jwt.verify(token, secret as Secret, (err, decoded) => {
		if (err) {
			return res.status(401).send({ error: 'Token invalid' });
		}
		if(typeof decoded !== 'object') {
			return res.status(401).send({ error: 'Token invalid' });
		}
		req.params.email = decoded.email;
		next();
	});
};

