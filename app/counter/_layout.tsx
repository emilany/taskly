import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Link, Stack } from 'expo-router'
import { Pressable } from 'react-native'
import { theme } from '../../theme'

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Counter',
          headerRight: () => (
            <Link href="/counter/history" asChild>
              <Pressable hitSlop={10}>
                <MaterialIcons
                  name="history"
                  size={24}
                  color={theme.colors.grey}
                />
              </Pressable>
            </Link>
          ),
        }}
      />
    </Stack>
  )
}

export default Layout
