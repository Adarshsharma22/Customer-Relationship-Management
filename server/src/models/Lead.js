import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true , 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        require: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
        trim: true,
    },
    company: {
        type: String,
        trim: true,
        default: ''
    },
    source: {
        type: String,
        enum: ['Website', 'Referral', 'Social Media', 'Cold Call', 'Advertisement', 'Other'],
        default: 'other',
    },
    status: {
        type: String,
        enum: ['New', 'Contacted', 'Qualified', 'Lost', 'Won'],
        default: 'New',
    },
    assignedAgent: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        default: null 
    },
    tags: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Tag' 
    }],
    address: { 
        type: String, 
        default: '' 
    },
    city: { 
        type: String, 
        default: '' 
    },
    state: { 
        type: String, 
        default: '' 
    },
    country: { 
        type: String, 
        default: '' 
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
},
    { timestamps: true }
);

leadSchema.index({ email: 1 });
leadSchema.index({ phone: 1 });
leadSchema.index({ status: 1 });
leadSchema.index({ assignedAgent: 1 });
leadSchema.index({ createdAt: -1 });
leadSchema.index({ name: 'text', email: 'text', company: 'text' });

const Lead = mongoose.model('Lead', leadSchema);

export default Lead;
