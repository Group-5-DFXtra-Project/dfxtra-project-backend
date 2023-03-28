import ProfileInfo from '../models/ProfileInfo.js';

export const addCertification = async (req, res, next) => {
	try {
		// get info from requests
		const certification = req.body.content;
		const userId = req.userId;

		// check the user is updating the right profile
		const profileInfo = await ProfileInfo.findOne({ user: userId });
		if (!profileInfo) {
			return res.status(404).json({ message: 'user not found!' });
		}
		// add new certification to the profile
		profileInfo.certifications.push({ certName: certification });
		await profileInfo.save();

		// send success message
		return res.status(200).json({ message: `Certification Added` });
	} catch (e) {
		next(e);
	}
};
