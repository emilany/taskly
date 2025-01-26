import AntDesign from '@expo/vector-icons/AntDesign'
import Entypo from '@expo/vector-icons/Entypo'
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
      <View style={styles.row}>
        <Entypo
          name={isCompleted ? 'check' : 'circle'}
          size={24}
          color={isCompleted ? theme.colors.grey : theme.colors.cerulean}
        />

        <Text
          style={[styles.text, isCompleted ? styles.completedText : undefined]}
          numberOfLines={1}
        >
          {name}
        </Text>
      </View>

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
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: theme.colors.grey,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    flex: 1,
    alignItems: 'center',
    marginRight: 8,
  },
})
