import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	columns: {
		type: Array, 
		required: true,
	}
}, {
	timestamps: true,
});

export default mongoose.model('Project', ProjectSchema);