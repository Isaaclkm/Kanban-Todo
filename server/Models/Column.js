import mongoose from 'mongoose';

const ColumnSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	projectId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Project',
		
	},
	tasks: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Task',
	}]
}, {
	timestamps: true,
});

export default mongoose.model('Column', ColumnSchema );