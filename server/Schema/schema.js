import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolver.js';



const typeDefs = `

    type Query {
         hello: String
         greet(name: String!): String
         getProject: [Project]
         getColumn: [Column]
         Tasks: [Task]
         Users: [User]
    }

    type Task{
        _id: ID
        title: String!
        description: String!
        number: Int
        projectId: String!
        columnId: String! 
    }

    type User{
        _id: ID
        firstname: String!
        lastname: String!
        age: Int
    }

    type Project {
        _id: ID
        name: String!
        description: String
        createdBy: User!
        createdAt: Date!
        columns: [Column]
      }

    type Column {
        _id: ID!
        name: String!
        tasks: [Task]
      }

    type Mutation {
        createTask(input: TaskInput): Task

        createUser(input: UserInput): User
        updateUser(_id: ID, input: UserInput): User
        deleteUser(_id: ID): User
        
        createProject(input: ProjectInput): Project
        updateProject(_id: ID, input: ProjectInput): Project 
        deleteProject(_id: ID): Project

        createColumn(input: ColumnInput): Column
        
    }

    scalar Date

    input TaskInput{
        title: String!
        description: String!
    }

    input UserInput {
        firstname: String!
        lastname: String!
        age: Int
    }

    input ProjectInput{
        name: String!
        description: String
    }

    input ColumnInput {
        name: String!
        projectId: ID!
      }
`;


export const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });