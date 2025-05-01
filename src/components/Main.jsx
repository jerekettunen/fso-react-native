import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import SingleRepositoryView from './SingleRepositoryView';
import SignIn from './SignIn';
import SignUp from './SignUp';
import MyReviews from './MyReviews';
import ReviewForm from './ReviewForm';
import AppBar from './AppBar';
import { Route, Routes, Navigate, useMatch } from 'react-router-native';



const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});


const Main = () => {  
  const repoMatch = useMatch('/repo/:id');
  console.log("This is the repomatch" + repoMatch);
  // console.log(repoMatch.params.id);
  const repoID = repoMatch ? repoMatch.params.id : '';

  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/signin" element={<SignIn />} exact />
        <Route path="/signup" element={<SignUp />} exact />
        <Route path="/review" element={<ReviewForm />} exact />
        <Route path="/myReviews" element={<MyReviews />} exact />
        <Route path="/repo/:id" element={<SingleRepositoryView id={repoID} />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>

  );
};

export default Main;