import Classroom from '../models/classroom.js'
import { hashPassword } from './password.script.js'
import { loadUser, loadStudents, loadTeacher } from './user.script.js'
import Teacher from '../models/teacher.js';
import Student from '../models/classroom.js';
import User from '../models/user.js'
import { loadClassrooms } from './classroom.script.js';






const deleteDocuments = async () => {
    deleteC = await Classroom.deleteMany();
    deleteU = await User.deleteMany();
    deleteT = await Teacher.deleteMany();
    deleteS = await Student.deleteMany();

    console.log(`classroom deleted: ${deleteC?.deletedCount}`)
    console.log(`user deleted: ${deleteU?.deletedCount}`)
    console.log(`teacher deleted: ${deleteT?.deletedCount}`)
    console.log(`student deleted: ${deleteS?.deletedCount}`)
}



export const loadData = async () => {
    try {
        /* await deleteDocuments();*/

        const classrooms = await loadClassrooms([]);
        const passwords = hashPassword();
        const users = await loadUser(passwords, []);
        const teachers = await loadTeacher(users, classrooms, []);
        debugger;
        const students = await loadStudents(users, teachers, classrooms, []);
        debugger;
    } catch (error) {
        console.log(error.message)
    }
}

