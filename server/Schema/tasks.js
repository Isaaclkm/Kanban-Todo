import { gql } from "apollo-server"; 


export const typeDefs = gql`

extend type Query {
    tasks: [Task]
    task(_id: ID!): Task
  }
  type Mutation {
    createTask(title: String!, columnId: ID!): Task
    updateTask(_id: ID!, title: String!, columnId: ID!): Task
    deleteTask(_id: ID!): Task
  }


  type Task {
    _id: ID!
    title: String!
    project: Project
    column: Column
    createdAt: String
    updatedAt: String
  }

`

export const resolvers = {
	Query: {
		tasks: async () => {
			return await Task.find();
		},
		task: async (_, { _id }) => {
			return await Task.findById(_id);
		  }
    },

    Mutation: {
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
    Task: {
      project: async (parent) => {
        return await Project.findById(parent.projectId);
      }
    },
  }
