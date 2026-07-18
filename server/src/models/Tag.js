import mongoose from 'mongoose'

const tagSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            unique: true,
            trim: true,
        },
        color: {
            typr: String,
            default: '#3B82F6',
        },
        createdBy: {
            type: mongooes.Schema.Types.ObjectId,
            ref: 'User'
        },
    },
    { timestamps: true },
);

const Tag = mongoose.model('Tag', tagSchema);

export default Tag;