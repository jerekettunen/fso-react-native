import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  reviewContainer: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  reviewRow: {
    flexDirection: 'row',
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  ratingText: {
    color: theme.colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dateText: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginBottom: 8,
  },
  reviewText: {
    lineHeight: 20,
    color: theme.colors.textPrimary,
  },
  divider: {
    borderBottomColor: theme.colors.background,
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  headerStyle: {
    paddingBottom: 15,
  },
});
 

const ItemSeparator = () => <View style={styles.separator} />;


const ReviewItem = ({ item }) => {
  const formattedDate = format(new Date(item.createdAt), 'dd.MM.yyyy');
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewRow}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.username}>{item.user.username}</Text>
          <Text style={styles.dateText}>{formattedDate}</Text>
          <Text style={styles.reviewText}>{item.text}</Text>
        </View>
      </View>
    </View>
  );
}


const SingleRepositoryView = ( { id } ) => {
  const { repository, loading } = useRepository(id);
  if (loading) {
    return <Text>loading...</Text>;
  }
  const reviews = repository.reviews.edges.map(edge => edge.node);
  console.log(reviews);
  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem item={item} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => <RepositoryItem item={repository} state={true} />}
      ListHeaderComponentStyle={{ paddingBottom: 10 }}
    />
  );
}
export default SingleRepositoryView;
