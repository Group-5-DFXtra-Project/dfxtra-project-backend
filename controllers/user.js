import User from "../models/User.js";
//controllers simply deal with ascertaining access rights of individuals trying to log in to accounts etc. 
import { handleError } from "../error.js";
import ProfileInfo from "../models/ProfileInfo.js";

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }
    catch (err) {
        next(err);
    }
};

export const getProfileInfo = async (req, res, next) => {
    try {
        const profileInfo = await ProfileInfo.find({ user: req.userId });
        res.status(200).json(profileInfo);
    } catch (error) {
        next(error);
    }
};

