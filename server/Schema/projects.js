import { gql } from "apollo-server"; 


export const typeDefs = gql`

extend type Query {
    project(_id: ID!): Project
  }
  
  type Mutation {
    createProject(name: String!, description: String!): Project
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
		project: async (_, { _id }) => {
			return await Project.findById(_id);
		}
  },

  Mutation: {
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
  }
}