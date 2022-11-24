import mongoose from 'mongoose';


const studentSchema = mongoose.Schema({
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
  },
  words: [{
    word: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Word',
    },
    priority: Number
  }],
  classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
  }
});

const Student = mongoose.model('Student', studentSchema);
export default Student;
