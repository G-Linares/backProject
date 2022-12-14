import dotenv from 'dotenv';

dotenv.config();

export const corsConfig = {
	origin: process.env.CONNECTION_FRONT_END_PORT,
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true,
};

export const headerConfig = (req, res, next) => {
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Origin', req.headers.origin);
	res.header(
		'Access-Control-Allow-Methods',
		'GET,PUT,POST,DELETE,UPDATE,OPTIONS'
	);
	res.header(
		'Access-Control-Allow-Headers',
		'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
	);
	next();
};

export const socketCorsConfig = {
	cors: {
		origin: process.env.CONNECTION_FRONT_END_PORT,
		methods: ['GET', 'POST'],
	},
};
