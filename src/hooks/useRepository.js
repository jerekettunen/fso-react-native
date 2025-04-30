import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {


  const {data, error, loading, refetch} = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id },
  });
  if (error) {
    console.log(error);
  }

  const repository = data ? data.repository : null;


  return { repository, loading, refetch};
};

export default useRepository;