import express from 'express';

import { getAllTeacher } from '../controllers/teacher.js';

const teacherRouter = express.Router();
teacherRouter.get('/', getAllTeacher);

export default teacherRouter;
