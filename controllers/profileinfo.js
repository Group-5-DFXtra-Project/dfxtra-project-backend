import ProfileInfo from "../models/ProfileInfo.js";

export const addCertification = async (req, res, next) => {
    try {
        const certification = req.body.content;
        const userId = req.userId;
        const profileInfo = await ProfileInfo.findOne({ user: userId });
        if (!profileInfo) {
            return res.status(404).json({ message: "user not found!" })
        };
        profileInfo.certifications.push(certification);
        await profileInfo.save();
    } catch (e) {
        next(e)
    }
}