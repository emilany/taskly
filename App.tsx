import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import { theme } from './theme'

export default function App() {
  const handleDelete = () => {
    Alert.alert(
      'Are you sure you want to delete this?',
      'It will be gone for good',
      [
        {
          text: 'Yes',
          onPress: () => console.log('Ok, deleting'),
          style: 'destructive',
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.text}>Coffee</Text>

        <TouchableOpacity
          onPress={handleDelete}
          activeOpacity={0.8}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 18,
    fontWeight: '200',
  },
  button: {
    backgroundColor: theme.colors.black,
    padding: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
})
