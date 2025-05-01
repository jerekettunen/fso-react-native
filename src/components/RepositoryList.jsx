import { FlatList, View, StyleSheet, Text, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from "react-router-native";
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import React, { useState, useMemo } from 'react';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});
 
const RepositoryListHeader = ({ filter, setFilter, searchQuery, setSearchQuery }) => {
  return (
    <View>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={{ marginBottom: -25, marginTop: 10, marginLeft: 10, marginRight: 10, borderRadius: 5 }}
      />
      <Picker style={{ marginBottom: -25 }}
        selectedValue={filter}
        onValueChange={(itemValue, itemIndex) => setFilter(itemValue)}
        >
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </View>
  );
}


const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { filter, setFilter, searchQuery, setSearchQuery } = this.props;
    return (
      <RepositoryListHeader
        filter={filter}
        setFilter={setFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    );
  };
  render() {
    const { repositories, navigate } = this.props;
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : null;
  return (
    <View>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => 
          <Pressable onPress={() => navigate(`/repo/${item.id}`)}>
            <RepositoryItem item={item} state={false}/>
          </Pressable>
        }
        ListHeaderComponent={this.renderHeader}
      />
    </View>
  );
}
}

// Higher-order component to inject navigation prop
const withNavigation = (Component) => {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
};

// Wrapped container with navigation
const NavigationEnabledContainer = withNavigation(RepositoryListContainer);



const RepositoryList = () => {

  const [filter, setFilter] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');

  const [debouncedSearch] = useDebounce(searchQuery, 500);

  const { repositories } = useRepositories(filter, debouncedSearch);

  // Get the nodes from the edges array

  return <NavigationEnabledContainer repositories={repositories} 
  filter={filter} 
  setFilter={setFilter}
  searchQuery={searchQuery}
  setSearchQuery={setSearchQuery} />;
};

export default RepositoryList;