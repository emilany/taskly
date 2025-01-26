import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { theme } from '../../theme'
import { registerForPushNotificationsAsync } from '../../utils/notification'

export default function CounterScreen() {
  const scheduleNotification = async () => {
    const result = await registerForPushNotificationsAsync()
    if (result === 'granted') {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `I'm a notification from your app`,
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          hour: 0,
          minute: 0,
        },
      })
    } else {
      if (Device.isDevice) {
        Alert.alert(
          'Unable to schedule a notification',
          'Enable the notification permission for Expo Go in settings'
        )
      }
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={scheduleNotification}
      >
        <Text style={styles.buttonText}>Schedule notification</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
  },
  button: {
    backgroundColor: theme.colors.black,
    borderRadius: 6,
    padding: 12,
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
})
