import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
    description: {
        type: String
    },
	projectId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Project',
		required: true,
	},
}, {
	timestamps: true,
});

export default mongoose.model('Task', TaskSchema );