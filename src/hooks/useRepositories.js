import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ( props ) => {
  const {filter, search, first } = props;

  const orderBy = filter === 'latest' ? 'CREATED_AT' : filter === 'highest' ? 'RATING_AVERAGE' : 'RATING_AVERAGE';
  const orderDirection = filter === 'latest' ? 'DESC' : filter === 'highest' ? 'DESC' : 'ASC';
  const variables = {
    orderBy,
    orderDirection,
    searchKeyword: search ? search : '',
    first: first ? first : 8,
  };
  
  const {data, error, loading, fetchMore} = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: variables,
  });
  if (error) {
    console.log(error);
  }

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  const repositories = data ? data.repositories : null;


  return { repositories, loading, fetchMore: handleFetchMore, error };
};

export default useRepositories;