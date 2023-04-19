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
    }
}