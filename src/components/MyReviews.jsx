
import { View, Text, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import { format } from 'date-fns';
import theme from '../theme';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';


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
  // Added button container styling
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  // Added button styling
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
  },
  // Primary button style
  primaryButton: {
    backgroundColor: theme.colors.primary,
    marginRight: 10,
  },
  // Danger button style
  dangerButton: {
    backgroundColor: "red",
    marginLeft: 10,
  },
  // Button text style
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

const ReviewItem = ({ item, refetch }) => {
  const navigate = useNavigate();

  const [deleteReview, result] = useMutation(DELETE_REVIEW);

  const handleDelete = async () => {
    try {
      const data = await deleteReview({ variables: { id: item.id } });
      console.log(data);
      if (data) {
        refetch();
      }
    } catch (e) {
      console.error(e);
    }
  };


  const createAlert = async () =>
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => handleDelete() }
      ]
    );

  const formattedDate = format(new Date(item.createdAt), 'dd.MM.yyyy');
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewRow}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.username}>{item.repository.fullName}</Text>
        <Text style={styles.dateText}>{formattedDate}</Text>
        <Text style={styles.reviewText}>{item.text}</Text>
      </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, styles.primaryButton]}
          onPress={() => navigate(`/repo/${item.repository.id}`)}
        >
          <Text style={styles.buttonText}>View repository</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.dangerButton]}
          onPress={createAlert}
        >
          <Text style={styles.buttonText}>Delete review</Text>
        </Pressable>
      </View>
    </View>
    );
}


const MyReviews = () => {
  const { data, error, refetch } = useQuery(GET_ME, {
    variables: { includeReviews: true },
  });
  if (error) {
    console.error(error);
    return <Text>Error loading reviews</Text>;
  }
  const reviews = data?.me?.reviews?.edges.map(edge => edge.node) || [];
  console.log(reviews);
  return (
    <View>
      <FlatList
        data={reviews}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => <ReviewItem item={item} refetch={refetch} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
export default MyReviews;