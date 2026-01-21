import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => { 
    let token = req.headers.authorization;
    if (!token) {
        return res.json({ success: false, message: "Not Authorized" });
    }

    // Support "Bearer <token>" or raw token
    if (token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
    }

    try {
        // const userId = jwt.decode(token, process.env.JWT_SECRET);
        const userId = jwt.verify(token, process.env.JWT_SECRET);

        if (!userId) {
            return res.json({ success: false, message: "Not Authorized" });
        }
        req.user = await User.findById(userId).select("-password");
        next();
    } catch (error) {
        return res.json({ success: false, message: "Not Authorized" });
    }
}