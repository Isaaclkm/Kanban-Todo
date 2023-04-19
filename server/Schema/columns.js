import { gql } from "apollo-server"; 


export const typeDefs = `

type Query {
    #columns: [Column]
  }


  type Column{
    _id: ID!
    title: String!
    project: Project
    createdAt: String!
  }

`

export const resolvers = {
	Query: {
		column: async (_, { _id }) => {
			return await Column.findById(_id);
		}
    }
}