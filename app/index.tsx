import { useEffect, useState } from 'react'
import {
  FlatList,
  LayoutAnimation,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { ShoppingListItem } from '../components/ShoppingListItem'
import { theme } from '../theme'
import { orderShoppingList } from '../utils/helpers'
import { getFromStorage, saveToStorage } from '../utils/storage'
import { ShoppingListItemType } from '../utils/types'

const storageKey = 'shopping-list'

export default function App() {
  const [value, setValue] = useState('')
  const [shoppingList, setShoppingList] = useState<ShoppingListItemType[]>([])

  useEffect(() => {
    const fetchInitial = async () => {
      const data = await getFromStorage(storageKey)
      if (data) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setShoppingList(data)
      }
    }
    fetchInitial()
  }, [])

  const handleSubmit = () => {
    if (value) {
      const updatedShoppingList = [
        {
          id: new Date().toTimeString(),
          name: value,
          lastUpdatedTimestamp: Date.now(),
        },
        ...shoppingList,
      ]
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      setShoppingList(updatedShoppingList)
      saveToStorage(storageKey, updatedShoppingList)
      setValue('')
    }
  }

  const handleDelete = (id: string) => {
    const updatedShoppingList = shoppingList.filter((item) => item.id !== id)
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setShoppingList(updatedShoppingList)
    saveToStorage(storageKey, updatedShoppingList)
  }

  const handleToggleComplete = (id: string) => {
    const updatedShoppingList = shoppingList.map((item) =>
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
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setShoppingList(updatedShoppingList)
    saveToStorage(storageKey, updatedShoppingList)
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
