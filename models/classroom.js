import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate'

const classroomSchema = mongoose.Schema({
  number: {
    type: Number,
    min: 1,
    max: 6
  },

  letter: {
    type: String,
    enum: ['A','B','C']
  },
});
const Student = mongoose.model('Classroom', classroomSchema);
export default Student;