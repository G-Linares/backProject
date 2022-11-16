import express from 'express';
import { ping, signIn, listUsers } from '../Controllers/usersController.js';

const usersRouter = express.Router();

usersRouter.get('/ping', ping);
usersRouter.get('/allUsers', listUsers);
usersRouter.post('/signin', signIn);

export default usersRouter;
