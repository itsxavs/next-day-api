import bcrypt from 'bcrypt'

const createPassword = ['javier01', 'eva01', 'roberto01', 'ana01', 'nacho01', 'nur01', 'hector01', 'jorge01', 'eloisa01', 'julio01', 'jesus01', 'adrian01', 'miguel01', 'sara01', 'rebeca01', 'lucia01']
export const hashPassword = () => {
    try {
        return createPassword.reduce((passwords, password) => {
            password = bcrypt.hashSync(password, 12)
            return [...passwords, password];
        }, [])
    } catch (error) {
        console.log(`error del password: ${error.message}`)
    }
}