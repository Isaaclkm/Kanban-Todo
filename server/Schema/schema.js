import { makeExecutableSchema } from 'graphql-tools';
// import { resolvers } from './resolver.js';
import { gql } from "apollo-server"; 
import {typeDefs as Project} from './projects.js'
import {typeDefs as Columns} from './columns.js'
import {typeDefs as Tasks} from './tasks.js'

import{resolvers as projectResolvers} from './projects.js'
import{resolvers as taskResolvers} from './tasks.js'
import{resolvers as colResolvers} from './columns.js'

const rootTypeDefs = gql`

type Query {
    hello: String
    projects: [Project]
    project(_id: ID!): Project
    columns: [Column]
    column(_id: ID!): Column
    tasks: [Task]
    task(_id: ID!): Task
  }

  type Mutation {
    createProject(name: String!, description: String!): Project
    updateProject(_id: ID!, name: String!, description: String): Project
    deleteProject(_id: ID!): Project

    createColumn(title: String!, projectId: ID!): Column
    updateColumn(_id: ID!, title: String!): Column
    deleteColumn(_id: ID!): Column

    createTask(title: String!, columnId: ID!): Task
    updateTask(_id: ID!, title: String!, columnId: ID!): Task
    deleteTask(_id: ID!): Task
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

  type Column{
    _id: ID!
    title: String!
    project: Project
    createdAt: String!
  }

  type Task {
    _id: ID!
    title: String!
    project: Project
    column: Column
    createdAt: String
    updatedAt: String
  }
`;



export const rootResolvers = {
	Query: {
		hello: () => "Hello world bithces!",
    }
  }

export const resolvers = [rootResolvers, projectResolvers, taskResolvers, colResolvers ] 
export const typeDefs = [rootTypeDefs, Project, Columns, Tasks ]
// export const schema = makeExecutableSchema({
//     typeDefs,
//     resolvers,
//   });