// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();

// export const verifyToken = (req, res, next) =>{
//     const authHeader = req.headers( "authorization");


//     if (!authHeader) {
//         console.log("Authorization header not found");
//         return res.status(403).json({msg: "No token provided."});

//     }

//     const token = authHeader.startWith("Bearer")
//     ? authHeader.substring(7, authHeader.length)
//     : authHeader;

//     if (!token) {
//         console.log("token not found in header");
//         return res.status(403).json({msg: "Token missing"});
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET || "SECRETBEBAS");
//         console.log("token decoded", decoded);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         console.log(error);
//         return res.status(401).json({msg: "unauthorized or invalid"});
//     }
// }

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]; // Use brackets for accessing headers

    if (!authHeader) {
        console.log("Authorization header not found");
        return res.status(403).json({ msg: "No token provided." });
    }

    const token = authHeader.startsWith("Bearer ") // Use 'startsWith' correctly
        ? authHeader.substring(7) // Start after 'Bearer '
        : authHeader; // Fallback, although it's not typical to just have a raw token here

    if (!token) {
        console.log("Token not found in header");
        return res.status(403).json({ msg: "Token missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "SECRETBEBAS");
        console.log("Token decoded:", decoded);
        req.user = decoded; // Attach the decoded user to the request
        next(); // Call the next middleware
    } catch (error) {
        console.log("Token verification failed:", error);
        return res.status(401).json({ msg: "Unauthorized or invalid" });
    }
};
