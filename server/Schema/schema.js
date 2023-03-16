import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolver.js';



const typeDefs = `

    type Query {
         hello: String
         greet(name: String!): String
         getProject: [Project]
         tasks: [Task]
         Users: [User]
    }

    type Task{
        _id: ID
        title: String!
        description: String!
        number: Int
    }

    type User{
        _id: ID
        firstname: String!
        lastname: String!
        age: Int
    }
    type Project {
        id: ID!
        name: String!
        description: String
        createdBy: User!
        createdAt: Date!
      }

    type Mutation {
        createTask(input: TaskInput): Task
        createUser(input: UserInput): User
        createProject(input: ProjectInput): Project
        deleteUser(_id: ID): User
        updateUser(_id: ID, input: UserInput): User
    }

    scalar Date

    input TaskInput{
        title: String!
        description: String!
        number: Int
    }

    input UserInput {
        firstname: String!
        lastname: String!
        age: Int
    }

    input ProjectInput{
        _id: ID
        name: String!
        createdAt: Date!
    }
`;


export const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });