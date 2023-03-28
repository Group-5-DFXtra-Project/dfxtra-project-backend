import mongoose from 'mongoose';

const ProfileInfoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    profileHeader: {
        displayName: String,
        tagLine: String,
        overview: String,
        profilePicture: String,
        githubLink: String,
        linkedinLink: String
    },
    experience: [
        {
            employerName: String,
            employerImage: String,
            position: String,
            startDate: Date,
            endDate: Date,
            description: String,
            skills: String,
            reference: {
                referenceName: String,
                referenceEmail: String,
                referenceNumber: Number
            }
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
            institutionName: String,
            institutionImage: String,
            educationLevel: String,
            subject: String,
            grade: String,
            description: String,
            startDate: Date,
            endDate: Date
        },
    ]
});

export default mongoose.model("ProfileInfo", ProfileInfoSchema);