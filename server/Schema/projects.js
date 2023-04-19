import { gql } from "apollo-server"; 


export const typeDefs = `

type Query {
    project(_id: ID!): Project
  }


  type Project {
    _id: ID!
    name: String!
    description: String!
    createdAt: String
    updatedAt: String
    #columns: [Column]
    #tasks: [Task]
  }

`

export const resolvers = {
	Query: {
		project: async (_, { _id }) => {
			return await Project.findById(_id);
		}
    }
}