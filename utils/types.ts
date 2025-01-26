import { Duration } from 'date-fns'

export type ShoppingListItemType = {
  id: string
  name: string
  lastUpdatedTimestamp: number
  completedAtTimestamp?: number
}

export type CountdownStatus = {
  isOverdue: boolean
  distance: Duration
}

export type PersistedCountdownState = {
  currentNotificationId: string | undefined
  completedAtTimestamps: number[]
}
