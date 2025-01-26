import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Tabs } from 'expo-router'
import { theme } from '../theme'

const Layout = () => {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: theme.colors.cerulean }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Shopping List',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="counter"
        options={{
          title: 'Counter',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="access-time-filled"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="idea"
        options={{
          title: 'Idea',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="lightbulb" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}

export default Layout
