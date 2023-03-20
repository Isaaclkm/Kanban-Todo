import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
    description: {
        type: String
    },
	columnId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Column',
		required: true,
	},
	tasks: [{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Task'
	}]
}, {
	timestamps: true,
});

export default mongoose.model('Task', TaskSchema );