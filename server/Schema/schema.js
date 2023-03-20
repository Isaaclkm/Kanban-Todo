import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolver.js';



const typeDefs = `

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
    columns: [Column]
    tasks: [Task]
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


export const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });