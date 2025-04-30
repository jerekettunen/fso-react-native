import { FlatList, View, StyleSheet, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useState, useEffect } from 'react';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});
 

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ( { repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : null;
  return (
    <View>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem item={item} />}
      />
    </View>
  );
}


const RepositoryList = () => {
  const { repositories } = useRepositories();

  // Get the nodes from the edges array

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;