import mongoose from "mongoose";

const noticeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tittle: String,
    subject: String,
    description: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const Notice = mongoose.model('Notice', noticeSchema)
export default Notice