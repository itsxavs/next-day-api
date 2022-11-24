import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "../models/user.js";
import Student from "../models/student.js";
import Teacher from "../models/teacher.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ massage: " User doesn't exist." });
    const isPassword = await bcrypt.compare(password, existingUser.password);
    if (!isPassword)
      return res.status(404).json({ message: " Password isn't correct" });
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );
    let userRole = await Teacher.findOne({ id: existingUser._id });
    if (!userRole) userRole = await Student.findOne({ id: existingUser._id });
    res.status(200).json({ result: existingUser, token, userRole });
  } catch (error) {}
};

export const signup = async (req, res) => {
  const { email, password, name, firstName, lastName, teacher, classrooms } =
    req.body;
  /*  email = JSON.parse(email); */

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const passwordHash = await bcrypt.hash(password, 12);

    const result = new User({ email, passwordHash, name, firstName, lastName });
    await result.save();
    // HASTA AQUI SE CREA EL USUARIO
    // AHORA A VER SI ES STUDENT OR TEACHER
    let userRole;
    if (teacher) {
      userRole = await new Teacher({
        idUser: result._id,
        students: [],
        classrooms: classrooms,
      }).populate("classrooms idUser");
      /*userRole.classrooms.concat(...classrooms) */
    } else {
      userRole = new Student({
        idUser: result._id,
        name: firstName,
        teacher: teacher._id,
        classroom: classrooms[0]._id,
      });
    }
    await userRole.save();
    const token = jwt.sign({ email: result.email, id: result._id }, "secret", {
      expiresIn: "1h",
    });
    res.status(201).json({ userRole, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const getAllUsers = async (req, res) => {
  debugger;
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
