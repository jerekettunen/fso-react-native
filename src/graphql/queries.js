import { gql } from '@apollo/client';


export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          forksCount
          fullName
          language
          stargazersCount
          reviewCount
          ratingAverage
          ownerAvatarUrl
          description
        }
      }
    }
  }
`;

export const GET_ME = gql`
  query {
    me {
      id
      username
    }
  }
`;