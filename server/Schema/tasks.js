import { gql } from "apollo-server-express";
import Column from '../Models/Column.js'
import Project from '../Models/Project.js'
import Task from '../Models/Task.js'

export const typeDefs = gql`

extend type Query {
    tasks: [Task]
    task(_id: ID!): Task
  }

  type Mutation {
    createTask(title: String!, columnId: ID!, description: String!, subtasks: [SubtaskInput]): Task
    updateTask(_id: ID!, title: String!, description: String! , columnId: ID!, subtasks: [SubtaskInput]): Task
    deleteTask(_id: ID!): Task
  }

  type Tasks{
    title: String!
    createdAt: String
  }

  type Task {
    _id: ID!
    title: String!
    project: Project
    description: String
    subtasks: [Subtask]
    column: Column
    createdAt: String
    updatedAt: String
  }

  type Subtask {
  title: String!
}

  input SubtaskInput {
  title: String!
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
      createTask: async (_, { title, columnId, description, subtasks }) => {
        try {
          const columnFound = await Column.findById(columnId);
          if (!columnFound) {
            throw new Error("Column not found");
          }
          const subtaskInputs = subtasks || [];
          console.log(subtaskInputs)
          const task = new Task({
            title,
            columnId,
            description,
            subtasks: subtaskInputs.map(({ __typename, title }) => ({
              __typename, // Include __typename field
              title
            })),
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
      updateTask: async (_, { _id, title, columnId, description, subtasks  }) => {
        const taskId = _id
        try {
          const task = await Task.findById(taskId);
          if (!task) {
            throw new Error("Task not found");
          }
      
          task.title = title;
          task.columnId = columnId
          task.description = description
          task.subtasks = subtasks.map(({ title }) => ({ title }));
          const updatedTask = await task.save();
      
          return updatedTask;
        } catch (error) {
          throw new Error(error);
        }
      },

    },
    Task: {
      column: async (parent) => {
        return await Column.findById(parent.columnId);
      }
    },
  }
