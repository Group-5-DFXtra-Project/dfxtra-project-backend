import mongoose from 'mongoose';

const ProfileInfoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    certifications: {
        certificationName: {
            type: String,
            required: true,
        },
        certificationImage: {
            type: String,
        },
    }
});