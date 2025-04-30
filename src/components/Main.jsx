import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import SingleRepositoryView from './SingleRepositoryView';
import SignIn from './SignIn';
import AppBar from './AppBar';
import { Route, Routes, Navigate, useMatch } from 'react-router-native';



const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});


const Main = () => {  
  const repoMatch = useMatch('/:id');
  const repoID = repoMatch ? repoMatch.params.id : null;

  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/signin" element={<SignIn />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/:id" element={<SingleRepositoryView id={repoID} />} exact />
      </Routes>
    </View>

  );
};

export default Main;