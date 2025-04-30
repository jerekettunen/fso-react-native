import { useApolloClient, useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    const data = await mutate({
      variables: {
        credentials: {
          username,
          password,
        },
      },
    });
    authStorage.setAccessToken(data.data.authenticate.accessToken);
    apolloClient.resetStore();
    return data
  };

  return [signIn, result];
};

export default useSignIn;