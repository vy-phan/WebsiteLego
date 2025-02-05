import jwt from 'jsonwebtoken'
import User from '../models/users.models.js'

const protectRouterToken = async(req, res, next) => {
    try {
        const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];
        // console.log("Token received:", token);
        
        if(!token){
            return res.status(401).json({error: "Unauthorized - No Token Provided"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // console.log("Decoded token:", decoded);

        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protect route: ", error.message);
        res.status(500).json({error: "Internal Server Error"}) 
    }
}

export default protectRouterToken