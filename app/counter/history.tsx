import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { theme } from '../../theme'
import { countdownStorageKey } from '../../utils/helpers'
import { getFromStorage } from '../../utils/storage'
import { PersistedCountdownState } from '../../utils/types'

const fullDateFormat = 'LLL d yyyy, h:mm aaa'

export default function HistoryScreen() {
  const [countdownState, setCountdownState] =
    useState<PersistedCountdownState>()

  useEffect(() => {
    const init = async () => {
      const data = await getFromStorage(countdownStorageKey)
      setCountdownState(data)
    }
    init()
  }, [])

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.listContent}
      data={countdownState?.completedAtTimestamps}
      renderItem={({ item }) => (
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>
            {format(item, fullDateFormat)}
          </Text>
        </View>
      )}
      ListEmptyComponent={
        <View style={styles.listEmptyContainer}>
          <Text>Your shopping list is empty</Text>
        </View>
      }
    />
  )
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  listContent: {
    marginTop: 8,
  },
  listItem: {
    backgroundColor: theme.colors.lightGrey,
    marginHorizontal: 8,
    marginBottom: 8,
    padding: 12,
    borderRadius: 6,
  },
  listItemText: {
    fontSize: 18,
  },
  listEmptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 18,
  },
})
