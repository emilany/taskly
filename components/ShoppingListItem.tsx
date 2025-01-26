import AntDesign from '@expo/vector-icons/AntDesign'
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import { theme } from '../theme'

type Props = {
  name: string
  isCompleted?: boolean
  onDelete: () => void
  onToggleComplete: () => void
}

export const ShoppingListItem = ({
  name,
  isCompleted,
  onDelete,
  onToggleComplete,
}: Props) => {
  const handleDelete = () => {
    Alert.alert(
      `Are you sure you want to delete ${name}?`,
      'It will be gone for good',
      [
        {
          text: 'Yes',
          onPress: onDelete,
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
    <Pressable
      style={[
        styles.itemContainer,
        isCompleted ? styles.completedContainer : undefined,
      ]}
      onPress={onToggleComplete}
    >
      <Text
        style={[styles.text, isCompleted ? styles.completedText : undefined]}
      >
        {name}
      </Text>

      <TouchableOpacity
        onPress={handleDelete}
        activeOpacity={0.8}
        disabled={isCompleted}
      >
        <AntDesign
          name="closecircle"
          size={24}
          color={isCompleted ? theme.colors.grey : theme.colors.red}
        />
      </TouchableOpacity>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.cerulean,
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  completedContainer: {
    backgroundColor: theme.colors.lightGrey,
    borderBottomColor: theme.colors.lightGrey,
  },
  text: {
    fontSize: 18,
    fontWeight: '200',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: theme.colors.grey,
  },
})
