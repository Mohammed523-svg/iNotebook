import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    tag: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {minimize: false});

const NoteModel = mongoose.models.Note || mongoose.model("note", NoteSchema);

export default NoteModel;