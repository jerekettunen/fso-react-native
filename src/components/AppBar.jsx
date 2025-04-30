import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import { useQuery, useApolloClient } from '@apollo/client';
import { GET_ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: Constants.statusBarHeight * 0.2,
    paddingTop: Constants.statusBarHeight * 1.5,
    backgroundColor: theme.colors.appBarColor,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scrollView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
    padding: 10,
    
  },
});

const AppBar = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const { data } = useQuery(GET_ME);

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  }

  return (
  <View style={styles.container}>
    <ScrollView horizontal
      contentContainerStyle={styles.scrollView}>
      <AppBarTab title="Repositories" route="/" />
      {data && data.me ? (
        <>
          <Pressable onPress={signOut}>
            <AppBarTab title="Sign out" route='signOut' />
          </Pressable>   
        </>
      ) : (
        <>
          <AppBarTab title="Sign in" route="/signIn" />
        </>
      )}
      
    </ScrollView>
  </View>
  )
};

export default AppBar;

