import { intervalToDuration, isBefore } from 'date-fns'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { TimeSegment } from '../../components/TimeSegment'
import { theme } from '../../theme'
import { countdownStorageKey } from '../../utils/helpers'
import { registerForPushNotificationsAsync } from '../../utils/notification'
import { getFromStorage, saveToStorage } from '../../utils/storage'
import { CountdownStatus, PersistedCountdownState } from '../../utils/types'

// 10secs
const frequency = 10
const frequencyInMs = frequency * 1000

export default function CounterScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [countdownState, setCountdownState] =
    useState<PersistedCountdownState>()
  const [status, setStatus] = useState<CountdownStatus>({
    isOverdue: false,
    distance: {},
  })

  const lastCompletedTimestamp = countdownState?.completedAtTimestamps[0]

  useEffect(() => {
    const init = async () => {
      const data = await getFromStorage(countdownStorageKey)
      setCountdownState(data)
    }
    init()
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      const timestamp = lastCompletedTimestamp
        ? lastCompletedTimestamp + frequencyInMs
        : Date.now()
      setIsLoading(!lastCompletedTimestamp)
      const isOverdue = isBefore(timestamp, Date.now())
      const distance = intervalToDuration(
        isOverdue
          ? { start: timestamp, end: Date.now() }
          : { start: Date.now(), end: timestamp }
      )
      setStatus({ isOverdue, distance })
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [lastCompletedTimestamp])

  const scheduleNotification = async () => {
    let pushNotificationId
    const result = await registerForPushNotificationsAsync()
    if (result === 'granted') {
      pushNotificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'The thing is due!',
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: frequency,
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

    if (countdownState?.currentNotificationId) {
      await Notifications.cancelScheduledNotificationAsync(
        countdownState?.currentNotificationId
      )
    }

    const newCountdownState: PersistedCountdownState = {
      currentNotificationId: pushNotificationId,
      completedAtTimestamps: countdownState
        ? [Date.now(), ...countdownState.completedAtTimestamps]
        : [Date.now()],
    }

    setCountdownState(newCountdownState)

    await saveToStorage(countdownStorageKey, newCountdownState)
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    )
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
        <Text style={styles.buttonText}>I've done the thing!</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
