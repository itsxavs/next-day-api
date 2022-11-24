import express from 'express';
import { getStudents, getStudentsByTeacher } from '../controllers/student.js';
const studentRouter = express.Router();
studentRouter.get('/', getStudents);
studentRouter.get('getStudentsByTeacher/:id', getStudentsByTeacher)

export default studentRouter;
