import { useApolloClient, useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {

  const [mutate, result] = useMutation(CREATE_REVIEW);
  const apolloClient = useApolloClient();

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    const data = await mutate({
      variables: {
        review: {
          ownerName,
          repositoryName,
          rating: Number(rating),
          text,
        },
      },
    });
    apolloClient.resetStore();
    return data
  };

  return [createReview, result];
};

export default useCreateReview;