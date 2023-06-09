import mongoose from 'mongoose';

const ProfileInfoSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	profileHeader: {
		displayName: { type: String, default: `` },
		tagLine: { type: String, default: `` },
		overview: { type: String, default: `` },
		profilePicture: { type: String, default: `` },
		githubLink: { type: String, default: `` },
		linkedinLink: { type: String, default: `` },
	},
	experience: [
		{
			employerName: String,
			employerImage: String,
			position: String,
			startDate: String,
			endDate: String,
			description: String,
			skills: String,
			reference: {
				referenceName: String,
				referenceEmail: String,
				referenceNumber: Number,
			},
		},
	],
	certifications: [
		{
			certName: String,
			certImage: String,
		},
	],
	qualifications: [
		{
			qualName: String,
			qualImage: String,
			qualLevel: String,
			qualSubject: String,
			grade: String,
			description: String,
			startDate: Date,
			endDate: Date,
		},
	],
});

export default mongoose.model('ProfileInfo', ProfileInfoSchema);
