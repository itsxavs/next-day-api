import User from '../models/user.js'
import Teacher from '../models/teacher.js';
import Student from '../models/classroom.js';

export const loadUser = async (passwords, array) => {
    if (passwords.length === 0) {
        console.log('La putas password no se han guardado')
    } else {
        const createUser = [
            { email: 'javier.carrasco@gmail.com', password: passwords[0], name: 'Javier', firstName: 'Carrasco', lastName: 'Sánchez' },
            { email: 'eva.sanchez@gmail.com', password: passwords[1], name: 'Eva', firstName: 'Sánchez', lastName: 'Martinez' },
            { email: 'roberto.acosta@gmail.com', password: passwords[2], name: 'Roberto', firstName: 'Acosta', lastName: 'Domínguez' },
            { email: 'ana@gmail.com', password: passwords[3], name: 'Ana', firstName: 'Lopez', lastName: 'Gonzalez' },
            { email: 'nacho@gmail.com', password: passwords[4], name: 'Nacho', firstName: 'Jaime', lastName: 'Soriano' },
            { email: 'nur@gmail.com', password: passwords[5], name: 'Nur', firstName: 'Jorquera', lastName: 'Trascastro' },
            { email: 'hector@gmail.com', password: passwords[6], name: 'Hector', firstName: 'Hernández', lastName: 'Muñoz' },
            { email: 'jorge@gmail.com', password: passwords[7], name: 'Jorge', firstName: 'DeGrado', lastName: 'García' },
            { email: 'eloisa@gmail.com', password: passwords[8], name: 'Eloisa', firstName: 'Martín', lastName: 'Molina' },
            { email: 'julio@gmail.com', password: passwords[9], name: 'Julio', firstName: 'Mérida', lastName: 'Hoyos' },
            { email: 'jesus@gmail.com', password: passwords[10], name: 'Jesus', firstName: 'Marín', lastName: 'García' },
            { email: 'adrian@gmail.com', password: passwords[11], name: 'Adrian', firstName: 'Sevilla', lastName: 'Arrabal' },
            { email: 'miguel@gmail.com', password: passwords[12], name: 'Miguel', firstName: 'Piñero', lastName: 'Lubo' },
            { email: 'sara@gmail.com', password: passwords[13], name: 'Sara', firstName: 'Cruz', lastName: 'Vera' },
            { email: 'rebeca@gmail.com', password: passwords[14], name: 'Rebeca', firstName: 'Carrasco', lastName: 'Sanchez' },
            { email: 'lucia@gmail.com', password: passwords[15], name: 'Lucia', firstName: 'Flores', lastName: 'Velasco' },
        ]
        try {
            await createUser.reduce(async (users, user) => {
                user = new User(user)
                await user.save().then(() => {
                    return array.push(user._doc)
                })
            }, [])
            return array
        } catch (error) { console.log(error.mesagge) }

    }

}
export const loadTeacher = async (users, classrooms, array) => {
    debugger;
    if (users.length === 0) {
        console.log('Los usuarios no se han cargado')
    } else {
        try {
            const createTeachers = [
                { idUser: users[0]._id, students: [], classroom: [classrooms[0]._id] },
                { idUser: users[1]._id, students: [], classroom: [classrooms[1]._id] },
                { idUser: users[2]._id, students: [], classroom: [classrooms[2]._id] }
            ]
            await createTeachers.reduce(async (teachers, teacher) => {
                teacher = new Teacher(teacher);
                await teacher.save().then(() => {
                    debugger;
                    return array.push(teacher._doc)
                })
            }, [])
            return array
        } catch (error) { console.log(error.mesagge) }

    }
}




//Crear en la base de Datos



export const loadStudents = async (users, teacher, classrooms, array) => {
    debugger;
    const createStudents = [
        { idUser: users[2]._id, teacher: teacher[0], words: [], classroom: classrooms[0]._id },
        { idUser: users[3]._id, teacher: teacher[0], words: [], classroom: classrooms[0]._id },
        { idUser: users[4]._id, teacher: teacher[0], words: [], classroom: classrooms[0]._id },
        { idUser: users[5]._id, teacher: teacher[0], words: [], classroom: classrooms[0]._id },
        { idUser: users[6]._id, teacher: teacher[1], words: [], classroom: classrooms[0]._id },
        { idUser: users[7]._id, teacher: teacher[1], words: [], classroom: classrooms[0]._id },
        { idUser: users[8]._id, teacher: teacher[1], words: [], classroom: classrooms[0]._id },
        { idUser: users[9]._id, teacher: teacher[1], words: [], classroom: classrooms[0]._id },
        { idUser: users[10]._id, teacher: teacher[1], words: [], classroom: classrooms[0]._id },
        { idUser: users[11]._id, teacher: teacher[2], words: [], classroom: classrooms[0]._id },
        { idUser: users[12]._id, teacher: teacher[2], words: [], classroom: classrooms[0]._id },
        { idUser: users[13]._id, teacher: teacher[2], words: [], classroom: classrooms[0]._id },
        /*  { idUser: users[14]._id, teacher: teacher[2], words: [], classroom: classrooms[0]._id },
         { idUser: users[15]._id, teacher: teacher[2], words: [], classroom: classrooms[0]._id } */
    ]
    try {
        await createStudents.reduce(async (students, student) => {
            student = new Student(student);
            await student.save().then(() => {
                return array.push(student._doc)
            })
        }, [])
        return array
    } catch (error) { console.log(error.mesagge) }
}



