import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
	name: {
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
	columnId: {
		type: mongoose.Schema.Types.ObjectID,
		ref: 'Column', 
		required: true,
	}
}, {
	timestamps: true,
});

export default mongoose.model('Task', TaskSchema );