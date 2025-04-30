import { FlatList, View, StyleSheet, Text, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});
 

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ( { repositories }) => {

  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : null;
  return (
    <View>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => 
          <Pressable onPress={() => navigate(`/${item.id}`)}>
            <RepositoryItem item={item} state={false}/>
          </Pressable>
      }
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