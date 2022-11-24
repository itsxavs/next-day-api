import Classroom from "../models/classroom.js";

const classroom = {};

classroom.getAll = async (req, res) => {
  try {
    const classrooms = await Classroom.find();
    res.status(200).json(classrooms);
  } catch {
    res.status(404).json({ message: error.message });
  }
};

export default classroom;
