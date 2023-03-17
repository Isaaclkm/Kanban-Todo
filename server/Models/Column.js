import mongoose from 'mongoose';

const ColumnSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	projectId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Project',
		required: true,
	},
}, {
	timestamps: true,
});

export default mongoose.model('Column', ColumnSchema );