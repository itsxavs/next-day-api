import mongoose from "mongoose";

const exerciseSchema = mongoose.Schema({
    type: String,
    points: {
        type: Number,
        default: 0
    },

});

const Exercise = mongoose.model('Exercise', exerciseSchema)
export default exerciseSchema