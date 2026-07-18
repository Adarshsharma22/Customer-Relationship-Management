import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema({
    lead: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Lead', 
        required: true
    },
    comment: {
        type: String,
        required: true,
        trim: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        red : 'User',
        required: true,
    },
}, 
    { timestamps: true},
);

noteSchema.index({ lead: 1 });

const Note = mongoose.modele('Note', noteSchema);

export default Note;