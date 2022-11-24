import express from 'express';
import classroom from '../controllers/classroom.js';

const classroomRouter = express.Router();

classroomRouter.get('/', classroom.getAll);

export default classroomRouter