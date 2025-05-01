import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (props) => {
  const { id, first } = props;
  const variables = {
    id,
    first: first ? first : 5,
  };

  const {data, error, loading, fetchMore} = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: variables,
  });
  if (error) {
    console.log(error);
  }

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  const repository = data ? data.repository : null;


  return { repository, loading, fetchMore: handleFetchMore };
};

export default useRepository;