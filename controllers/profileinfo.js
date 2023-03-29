import ProfileInfo from '../models/ProfileInfo.js';

export const addCertification = async (req, res, next) => {
	try {
		// get info from requests
		const certification = req.body;
		const userId = req.userId;

		// check the user is updating the right profile
		const profileInfo = await ProfileInfo.findOne({ user: userId });
		if (!profileInfo) {
			return res.status(404).json({ message: 'user not found!' });
		}
		// add new certification to the profile
		profileInfo.certifications.push(certification);
		await profileInfo.save();

		// send success message
		return res.status(200).json({ message: `Certification Added` });
	} catch (e) {
		next(e);
	}
};

export const addQualification = async (req, res, next) => {
	try {
		// get info from requests
		const qualification = req.body;
		const userId = req.userId;

		// check the user is updating the right profile
		const profileInfo = await ProfileInfo.findOne({ user: userId });
		if (!profileInfo) {
			return res.status(404).json({ message: 'user not found!' });
		}
		// add new certification to the profile
		profileInfo.qualifications.push(qualification);
		await profileInfo.save();

		// send success message
		return res.status(200).json({ message: `Qualification Added` });
	} catch (e) {
		next(e);
	}
};
export const addExperience = async (req, res, next) => {
	try {
		// get info from requests
		const experience = req.body;
		const userId = req.userId;

		// check the user is updating the right profile
		const profileInfo = await ProfileInfo.findOne({ user: userId });
		if (!profileInfo) {
			return res.status(404).json({ message: 'user not found!' });
		}
		// add new certification to the profile
		profileInfo.experience.push(experience);
		await profileInfo.save();

		// send success message
		return res.status(200).json({ message: `Experience Added` });
	} catch (e) {
		next(e);
	}
};

export const updateProfileHeader = async (req, res, next) => {
	try {
		const userId = req.userId;
		const updatedProfileHeader = req.body;

		const profileInfo = await ProfileInfo.findOneAndUpdate(
			{ user: userId },
			{ profileHeader: updatedProfileHeader },
			{ new: true } // returns updated document
		);

		if (!profileInfo) {
			return res.status(404).json({ message: 'user not found' });
		}

		res.status(200).json(profileInfo.profileHeader);
	} catch (e) {
		next(e);
	}
};
