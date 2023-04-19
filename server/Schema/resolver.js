import Project from '../Models/Project.js'
import Task from '../Models/Task.js'
import Column from '../Models/Column.js'

export const resolvers = {
	Query: {
		hello: () => "Hello world bithces!",
		projects: async () => {
			return await Project.find();
		},
		project: async (_, { _id }) => {
			return await Project.findById(_id);
		},
        columns: async () => {
			return await Column.find();
		},
		column: async (_, { _id }) => {
			return await Column.findById(_id);
		},
		tasks: async () => {
			return await Task.find();
		},
		task: async (_, { _id }) => {
			return await Task.findById(_id);
		},
	},
	Mutation: {
        // Project resolvers
		createProject: async (_, { name, description }) => {
			const project = new Project({
				name,
				description,
			});
			const savedProject = project.save();
			return savedProject;
		},
		deleteProject: async (_, { _id }) => {
			const deletedProject = await Project.findByIdAndDelete(_id);
			if (!deletedProject) throw new Error("Project not found");
			return deletedProject;
		},
		updateProject: async (_, args) => {
			const updatedProject = await Project.findByIdAndUpdate(
				args._id,
				args,
				{ new: true }
			);
			if (!updatedProject) throw new Error("Project not found");
			return updatedProject;
		},

        // Column resolvers
		createColumn: async (_, { title, projectId }) => {
            try {
              const projectFound = await Project.findById(projectId);
              if (!projectFound) {
                throw new Error("Project not found");
              }
          
              const column = new Column({
                title,
                projectId,
              });
          
              await column.save();
          
              projectFound.columns.push(column);
              await projectFound.save();
          
              const updatedProject = await Project.findById(projectId)
                .populate('columns')
                .exec();
          
              return column;
            } catch (error) {
              throw new Error(error);
            }
          },

          deleteColumn: async (_, { _id }) => {
            try {
              const column = await Column.findById(_id);
              if (!column) {
                throw new Error("Column not found");
              }
          
              const project = await Project.findById(column.projectId);
              if (!project) {
                throw new Error("Project not found");
              }
          
              project.columns = project.columns.filter((col) => col.toString() !== _id.toString());
              await project.save();
          
              await Task.deleteMany({_id });
              await Column.findByIdAndDelete(_id);
          
              return column;
            } catch (error) {
              throw new Error(error);
            }
          },
		updateColumn: async (_, { _id, title }) => {
            const columnId = _id
            try {
              const column = await Column.findById(columnId);
              if (!column) {
                throw new Error("Column not found");
              }
          
              column.title = title;
              const updatedColumn = await column.save();
          
              return updatedColumn;
            } catch (error) {
              throw new Error(error);
            }
          },

  // Tasks resolvers 
        createTask: async (_, { title, columnId }) => {
            try {
              const columnFound = await Column.findById(columnId);
              if (!columnFound) {
                throw new Error("Column not found");
              }
          
              const task = new Task({
                title,
                columnId,
              });
          
              await task.save();
          
              columnFound.tasks.push(task);
              await columnFound.save();
          
              const updatedColumn = await Column.findById(columnId)
                .populate('tasks')
                .exec();
          
              return task;
            } catch (error) {
              throw new Error(error);
            }
          },

          deleteTask: async (_, { _id }) => {
            try {
              const task = await Task.findById(_id);
              if (!task) {
                throw new Error("Task not found");
              }
          
              const column = await Column.findById(task.columnId);
              if (!column) {
                throw new Error("Column not found");
              }
          
              column.tasks = column.tasks.filter((tas) => tas.toString() !== _id.toString());
              await column.save();
          
              await Task.findByIdAndDelete(_id);
          
              return task;
            } catch (error) {
              throw new Error(error);
            }
          },
          updateTask: async (_, { _id, title }) => {
            const taskId = _id
            try {
              const task = await Task.findById(taskId);
              if (!task) {
                throw new Error("Task not found");
              }
          
              task.title = title;
              const updatedTask = await task.save();
          
              return updatedTask;
            } catch (error) {
              throw new Error(error);
            }
          },

	},
	Project: {
		tasks: async (parent) => {
			return await Task.find({ projectId: parent._id });
		}
	},
	Task: {
		project: async (parent) => {
			return await Project.findById(parent.projectId);
		}
	}
};
    


