import { useState } from 'react'
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import { ShoppingListItem } from '../components/ShoppingListItem'
import { theme } from '../theme'

type ShoppingListItemType = {
  id: string
  name: string
  lastUpdatedTimestamp: number
  completedAtTimestamp?: number
}

const orderShoppingList = (shoppingList: ShoppingListItemType[]) => {
  return shoppingList.sort((item1, item2) => {
    if (item1.completedAtTimestamp && item2.completedAtTimestamp) {
      return item2.completedAtTimestamp - item1.completedAtTimestamp
    }

    if (item1.completedAtTimestamp && !item2.completedAtTimestamp) {
      return 1
    }

    if (!item1.completedAtTimestamp && item2.completedAtTimestamp) {
      return -1
    }

    if (!item1.completedAtTimestamp && !item2.completedAtTimestamp) {
      return item2.lastUpdatedTimestamp - item1.lastUpdatedTimestamp
    }

    return 0
  })
}

export default function App() {
  const [value, setValue] = useState('')
  const [shoppingList, setShoppingList] = useState<ShoppingListItemType[]>([])

  const handleSubmit = () => {
    if (value) {
      setShoppingList([
        {
          id: new Date().toTimeString(),
          name: value,
          lastUpdatedTimestamp: Date.now(),
        },
        ...shoppingList,
      ])
      setValue('')
    }
  }

  const handleDelete = (id: string) => {
    setShoppingList(shoppingList.filter((item) => item.id !== id))
  }

  const handleToggleComplete = (id: string) => {
    setShoppingList(
      shoppingList.map((item) =>
        item.id === id
          ? {
              ...item,
              lastUpdatedTimestamp: Date.now(),
              completedAtTimestamp: item.completedAtTimestamp
                ? undefined
                : Date.now(),
            }
          : item
      )
    )
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
      data={orderShoppingList(shoppingList)}
      renderItem={({ item }) => (
        <ShoppingListItem
          key={item.id}
          name={item.name}
          isCompleted={!!item.completedAtTimestamp}
          onDelete={() => handleDelete(item.id)}
          onToggleComplete={() => handleToggleComplete(item.id)}
        />
      )}
      ListEmptyComponent={
        <View style={styles.listEmptyContainer}>
          <Text>Your shopping list is empty</Text>
        </View>
      }
      ListHeaderComponent={
        <TextInput
          placeholder="e.g. Coffee"
          style={styles.textInput}
          value={value}
          onChangeText={setValue}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
          autoCorrect={false}
        />
      }
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingVertical: 12,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  textInput: {
    borderColor: theme.colors.lightGrey,
    borderWidth: 2,
    borderRadius: 50,
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 12,
    fontSize: 18,
    backgroundColor: theme.colors.white,
  },
  listEmptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 18,
  },
})
