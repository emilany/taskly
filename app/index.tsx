import { useState } from 'react'
import { ScrollView, StyleSheet, TextInput } from 'react-native'
import { ShoppingListItem } from '../components/ShoppingListItem'
import { theme } from '../theme'

type ShoppingListItemType = {
  id: string
  name: string
}

const initialList: ShoppingListItemType[] = [
  { id: '1', name: 'Coffee' },
  { id: '2', name: 'Tea' },
  { id: '3', name: 'Sugar' },
]

export default function App() {
  const [value, setValue] = useState('')
  const [shoppingList, setShoppingList] = useState(initialList)

  const handleSubmit = () => {
    if (value) {
      setShoppingList([
        { id: new Date().toTimeString(), name: value },
        ...shoppingList,
      ])
      setValue('')
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
    >
      <TextInput
        placeholder="e.g. Coffee"
        style={styles.textInput}
        value={value}
        onChangeText={setValue}
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
        autoCorrect={false}
      />

      {shoppingList.map((item) => (
        <ShoppingListItem key={item.id} name={item.name} />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    padding: 12,
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
})
