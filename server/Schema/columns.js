import { gql } from "@graphql-tools/schema"; 
import Column from '../Models/Column.js'
import Project from '../Models/Project.js'
import Task from '../Models/Task.js'


export const typeDefs = gql`

extend type Query {
    columns: [Column]
  }
  type Mutation {
    createColumn(title: String!, projectId: ID!): Column
    updateColumn(_id: ID!, title: String!): Column
    deleteColumn(_id: ID!): Column

  }

  type Column{
    _id: ID!
    title: String!
    project: Project
    createdAt: String!
    tasks: [Task]
  }

`

export const resolvers = {
	Query: {
    columns: async () => {
      return await Column.find();
    },
		column: async (_, { _id }) => {
			return await Column.findById(_id);
		  }
    },
    Mutation: {
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
    },
    Column: {
      tasks: async (parent) => {
        return await Task.find({ columnId: parent._id });
      }
    }
}