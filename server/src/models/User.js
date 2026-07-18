import mongoose from "mongoose"
import byrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true , "Please enter your name"],
        trim: true,
    },
    email: {
        type: String,
        required: [true , "Please enter your email"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
        type: String,
        required: [true , "Please enter your password"],
        minlength: [6, "Password must be at least 6 characters long"],
        trim: true,
    },
    role: {
        type: String,
        enum: ['super_admin', 'sub_admin', 'support_agent'],
        default: 'support_agent',
    },
    phone: {
        type: String,
        trim: true,
    },
    profileImage: {
        type: String,
        default: '',
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    createdBy: {
        tupe: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    lastLogin: {
        type: Date,
    },
 },
 {
    timestamps: true,
 }
);

userSchema.pre('save', async function(name) {
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(enterPassword, this.password);
};

user.Schema.index({ role: 1});

const User = mongoose.model('User', userSchema);

export default User;