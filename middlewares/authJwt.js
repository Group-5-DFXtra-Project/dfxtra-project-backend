import jwt from 'jsonwebtoken';


export const verifyToken = (req, res, next) => {
    let token = req.headers.authorization
    if (!token) {
        return res.status(403).send({ message: `No token provided` });
    }

    jwt.verify(token, process.env.JWT, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: `Unauthorised` });
        }

        req.userId = decoded.id;
        next();
    });
};

