import mongoose from 'mongoose';

const wordSchema = mongoose.Schema({
  name: String
});

const Word = mongoose.model('Word', wordSchema);
export default Word;