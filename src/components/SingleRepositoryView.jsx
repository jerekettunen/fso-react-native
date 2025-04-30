import React from 'react';
import { View, Text } from 'react-native';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';

const SingleRepositoryView = ( { id } ) => {
  const { repository, loading } = useRepository(id);
  if (loading) {
    return <Text>loading...</Text>;
  }
  console.log(repository);
  return (
    <View>
      <RepositoryItem item={repository} state={true} />
    </View>
  );
}
export default SingleRepositoryView;