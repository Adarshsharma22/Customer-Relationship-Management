import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/User.js'
import logActivity from '../utils/logActivity.js'


export const getUsers = asyncHandler(async (req, res) => {
    try {
        const page = pageInt(req.query.page, 10) || 1;
        const limit = pageInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;

        const filter = {};
        if (req.query.role) filter.role = req.query.role;
        if (req.query.status) filter.status = req.query.status;
        if (req.query.search) {
            filter.$or = [
                {name : { $regex: req.query.search, $options: 'i'}},
                {email : { $regex: req.query.search, $options: 'i'}},
            ]
        }

        const total = await User.countDocuments(filter);
        const users = await User.find(filter).sort('-createdAt').skip(skip).limit(limit);

        res.json({
            success: true,
            count: users.length,
            total,
            page,
            pages: Math.ceil(total / Limit),
            users,
        });

    } catch (err) {
        console.error('Error fetching users', err.message);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

export const getUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }
        res.json({
            success: true,
            user,
        });
    }catch (err) {
        console.error('Error fetching user', err.message);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});