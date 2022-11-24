import Classroom from '../models/classroom.js'
const createClassrooms = [
    { number: 1, letter: 'A' },
    { number: 1, letter: 'B' },
    { number: 2, letter: 'A' },
    { number: 2, letter: 'B' },
    { number: 3, letter: 'A' },
    { number: 3, letter: 'C' },
    { number: 4, letter: 'A' },
    { number: 4, letter: 'B' },
    { number: 5, letter: 'A' },
    { number: 5, letter: 'B' },
    { number: 6, letter: 'A' },
    { number: 6, letter: 'B' },
];
export const loadClassrooms = async (array) => {
    try {
        await createClassrooms.reduce(async (classrooms, classroom) => {
            classroom = new Classroom(classroom)
            await classroom.save().then(() => {
                return array.push(classroom._doc)
            })
        }, [])

        return array

    } catch (error) { console.log(error.mesagge) }
}