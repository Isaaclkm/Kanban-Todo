import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		enum: ['Todo', 'Doing', 'Done'],
	  },
	columns: [{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Column'
	}]
}, {
	timestamps: true,
});

export default mongoose.model('Project', ProjectSchema);