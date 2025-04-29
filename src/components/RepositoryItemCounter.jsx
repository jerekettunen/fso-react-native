import { View, StyleSheet } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  statItem: {
    alignItems: "center",
  },
});

const checkCount = (count) => {
  if (count > 1000) {
    return `${Math.round(count / 100) / 10}k`;
  }
  return count;
};

const RepositoryItemCounter = ({ item, name }) => {
  return (
    <View style={styles.statItem}>
      <Text fontWeight="bold">
        {checkCount(item)}
      </Text>
      <Text color="textSecondary">
        {name}
      </Text>
    </View>
  );
};

export default RepositoryItemCounter;