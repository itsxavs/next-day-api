import express from 'express';
const userRouter = express.Router();

import { signin, signup, getAllUsers } from '../controllers/user.js';

userRouter.post('/signin', signin);
userRouter.post('/signup', signup);
userRouter.get('/', getAllUsers);

export default userRouter;
