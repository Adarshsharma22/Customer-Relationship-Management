import ActivityLog from '../models/ActivityLogs.js'

const logActivity = async ({ user, action, module, description = '', req = null }) => {
    try {
        await ActivityLog.create({
            user,
            action,
            module,
            description,
            ipAddress: req ? req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress : '',
        });
    } catch (err) {
        console.error('Failed to log activity', err.message);
    }
};

export default logActivity;