import { useApolloClient, useMutation } from '@apollo/client';
import { SIGN_UP } from '../graphql/mutations';

const useSignUp = () => {
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(SIGN_UP);

  const signUp = async ({ username, password }) => {
    console.log('signUp', username, password);
    const data = await mutate({
      variables: {
        user: {
          username,
          password,
        },
      },
    });
    apolloClient.resetStore();
    return data;
  };

  return [signUp, result];
}
export default useSignUp;