import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectedUser = async (req, res, next) => {
    try {
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({ message: "Access Denied" });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Access Denied" });
        }

        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({ message: "Access Denied" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log();
        res.status(500).json({ message: "Server Error" });
    }
}