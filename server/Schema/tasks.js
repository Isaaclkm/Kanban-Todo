import { gql } from "apollo-server"; 


export const typeDefs = gql`

type Query {
    #tasks: [Task]
    #task(_id: ID!): Task
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