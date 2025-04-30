import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation ($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
      expiresAt
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation ($review: CreateReviewInput!) {
    createReview(review: $review) {
      repositoryId
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
`;