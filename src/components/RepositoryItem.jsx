import { View, Text, Image, StyleSheet, Button, Linking } from "react-native";
import RepositoryItemCounter from "./RepositoryItemCounter";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: theme.colors.cardColor,
    borderRadius: 10,
    marginTop: 7,
    marginLeft: 7,
    marginRight: 7,
    shadowColor: "#00000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.41,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    marginLeft: 10,
  },
  fullName: {
    fontWeight: "bold",
  },
  description: {
    color: "gray",
  },
  language: {
    color: "black",
    backgroundColor: "lightblue", // Changed to light blue
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 2,
    alignSelf: "flex-start",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  statItem: {
    alignItems: "center",
  },
  statCount: {
    fontWeight: "bold",
  },
  statLabel: {
    color: "gray",
  },
  button: {
    marginTop: 10,
    color: "white",
    backgroundColor: "#0366d6",
    borderRadius: 5,
    padding: 7,
  },
});


const RepositoryItem = ({ item, state }) => {
  return (
    <View 
    testID="repositoryItem"
    style={styles.container}>
      <View style={styles.row}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
        <View style={styles.textContainer} width="90%">
          <Text style={styles.fullName} numberOfLines={1} ellipsizeMode="tail">{item.fullName}</Text>
          <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">{item.description}</Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <RepositoryItemCounter item={item.stargazersCount} name="Stars" />
        <RepositoryItemCounter item={item.forksCount} name="Forks" />
        <RepositoryItemCounter item={item.reviewCount} name="Reviews" />
        <RepositoryItemCounter item={item.ratingAverage} name="Rating" />
      </View>
      {state && (
        <View style={styles.button}>
          <Button color="white" title="Open in GitHub" onPress={() => Linking.openURL(item.url)} />
        </View>
      )}
    </View>
  );
};

export default RepositoryItem;