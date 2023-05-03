import { gql } from "apollo-server";

export const GET_PROJECTS = gql`
  query {
    projects {
      _id
      name
    }
  }
`;