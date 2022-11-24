import Student from '../models/student.js';

export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getStudentsByTeacher = async (req, res) => {
  try {
    const {teacherId } = req.body;
    const students = await Student.find().where('teacherId').gte(teacherId);
    res.status(200).json(students)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}