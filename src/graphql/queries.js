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
          url
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query ($id: ID!) {
    repository(id: $id) {
      id
      forksCount
      fullName
      language
      stargazersCount
      reviewCount
      ratingAverage
      ownerAvatarUrl
      description
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
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