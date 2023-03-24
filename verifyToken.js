import jwt from "jsonwebtoken";
import { handleError } from "./error.js";
//This is middleware to verify before allowing access to browser. 
export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    //const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) return next(handleError(401, 'You are not permitted!'));

    //Either we verify the user and creater a new request for the user in our browser or we raise errors based on token affiliations
    //When we code the front end, we want to make sure that our user is coming from the below.

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(handleError(403, "Token invalid!"));
        req.user = user;
        next();
    });
};