import { gql } from "@graphql-tools/schema"; 
import Column from '../Models/Column.js'
import Project from '../Models/Project.js'
import Task from '../Models/Task.js'


export const typeDefs = gql`

extend type Query {
    project(_id: ID!): Project
    projects: [Project]
  }
  
  type Mutation {
    createProject(name: String!, description: String): Project
    updateProject(_id: ID!, name: String!, description: String): Project
    deleteProject(_id: ID!): Project
  }

  type Project {
    _id: ID!
    name: String!
    description: String!
    createdAt: String
    updatedAt: String
    columns: [Column]
    tasks: [Task]
  }

`



export const resolvers = {
	Query: {
    projects: async () => {
			return await Project.find();
		},
		project: async (_, { _id }) => {
			return await Project.findById(_id);
		}
  },

  Mutation: {
    createProject: async (_, { name }) => {
      const project = new Project({
        name,
      });

      const savedProject = project.save();
      return savedProject;
    },

    deleteProject: async (_, { _id }) => {
      const deletedProject = await Project.findByIdAndDelete(_id);
      if (!deletedProject) throw new Error("Project not found");
      return deletedProject;
    },

    updateProject: async (_, {_id, name, description}) => {
      const projectId = _id

      try {
        const project = await Project.findById(projectId);
        if(!project){
          throw new Error("Project not found")
        }

        project.name = name;
        project.description = description;
        const updatedProject = await project.save();

        return updatedProject
      } catch (error) {
        throw new Error(error)
      }
    },
  },
   
  Project: {
		columns: async (parent) => {
      return await Column.find({ projectId: parent._id });
    },
    
    tasks: async (parent) => {
      return await Task.find({ taskId: parent._id });
    }
	}, 

}