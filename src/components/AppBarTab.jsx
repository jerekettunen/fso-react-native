import Text from "./Text"
import { View, Pressable, StyleSheet } from "react-native"
import { Link } from "react-router-native"

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#3a3f44',
    borderRadius: 5,
  },
})

const AppBarTab = ({ title, route }) => {
  return (
    <View style={styles.container}>
      <Link to={route} component={Pressable}>
        <Text fontWeight="bold" fontSize="subheading" color="textTertiary">
          {title}
        </Text>
      </Link>
    </View>
  )
}
export default AppBarTab