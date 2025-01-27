import { ShoppingListItemType } from './types'

export const orderShoppingList = (shoppingList: ShoppingListItemType[]) => {
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

export const countdownStorageKey = 'taskly-countdown'
