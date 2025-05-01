import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ( key, filter ) => {

  const orderBy = key === 'latest' ? 'CREATED_AT' : key === 'highest' ? 'RATING_AVERAGE' : 'RATING_AVERAGE';
  const orderDirection = key === 'latest' ? 'DESC' : key === 'highest' ? 'DESC' : 'ASC';

  const {data, error, loading, refetch} = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { orderBy, orderDirection, searchKeyword: filter },
  });
  if (error) {
    console.log(error);
  }

  const repositories = data ? data.repositories : null;


  return { repositories, loading, refetch };
};

export default useRepositories;