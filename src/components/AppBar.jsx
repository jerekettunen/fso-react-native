import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';

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
  return (
  <View style={styles.container}>
    <ScrollView horizontal
      contentContainerStyle={styles.scrollView}>
      <AppBarTab title="Repositories" route="/" />
      <AppBarTab title="Sign In" route="/signin" />
    </ScrollView>
  </View>
  )
};

export default AppBar;

