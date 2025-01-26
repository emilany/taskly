import { intervalToDuration, isBefore } from 'date-fns'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TimeSegment } from '../../components/TimeSegment'
import { theme } from '../../theme'
import { registerForPushNotificationsAsync } from '../../utils/notification'
import { CountdownStatus } from '../../utils/types'

// 10 secs from now
const timestamp = Date.now() + 10 * 1000

export default function CounterScreen() {
  const [status, setStatus] = useState<CountdownStatus>({
    isOverdue: false,
    distance: {},
  })
  const [secondsElapsed, setSecondsElapsed] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      const isOverdue = isBefore(timestamp, Date.now())
      const distance = intervalToDuration(
        isOverdue
          ? { start: timestamp, end: Date.now() }
          : { start: Date.now(), end: timestamp }
      )
      setStatus({ isOverdue, distance })

      setSecondsElapsed((current) => current + 1)
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

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
    <View
      style={[
        styles.container,
        status.isOverdue ? styles.overdueContainer : undefined,
      ]}
    >
      <Text
        style={[
          styles.heading,
          status.isOverdue ? styles.overdueText : undefined,
        ]}
      >
        {status.isOverdue ? 'Thing overdue by...' : 'Thing due in...'}
      </Text>

      <View style={styles.row}>
        <TimeSegment
          unit="Days"
          number={status.distance.days ?? 0}
          textStyle={status.isOverdue ? styles.overdueText : undefined}
        />
        <TimeSegment
          unit="Hours"
          number={status.distance.hours ?? 0}
          textStyle={status.isOverdue ? styles.overdueText : undefined}
        />
        <TimeSegment
          unit="Minutes"
          number={status.distance.minutes ?? 0}
          textStyle={status.isOverdue ? styles.overdueText : undefined}
        />
        <TimeSegment
          unit="Seconds"
          number={status.distance.seconds ?? 0}
          textStyle={status.isOverdue ? styles.overdueText : undefined}
        />
      </View>

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
  overdueContainer: {
    backgroundColor: theme.colors.red,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  overdueText: {
    color: theme.colors.white,
  },
})
