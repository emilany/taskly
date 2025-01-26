import { Stack } from 'expo-router'

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Shopping List' }} />
    </Stack>
  )
}

export default Layout
