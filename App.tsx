import { StyleSheet, Text, View } from 'react-native'
import { theme } from './theme'

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.text}>Coffee</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.cerulean,
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: '200',
  },
})
