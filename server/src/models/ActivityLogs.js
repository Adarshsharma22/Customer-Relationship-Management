import mongoose from 'mongoose'

const activityLogSchema = new mongoose.Schema(
    {
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        },
        action: { 
            type: String, 
            required: true 
        },
        module: { 
            type: String, 
            required: true 
        },
        description: { 
            type: String, 
            default: '' 
        },
        ipAddress: { 
            type: String, 
            default: '' 
        },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

activityLogSchema.index({ createdAt: -1 });
activityLogSchema.index({ user: 1 });

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

export default ActivityLog;