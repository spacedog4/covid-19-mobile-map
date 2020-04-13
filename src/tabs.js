import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import List from './pages/List'
import Map from './pages/Map'

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let iconPackage = 'ionicons'

            if (route.name === 'List') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            } else if (route.name === 'Map') {
              if (focused)
                iconPackage = 'fontawesome'

              iconName = focused ? 'globe' : 'md-globe';
            }

            // You can return any component that you like here!
            if (iconPackage === 'fontawesome') {
              return <FontAwesome name={iconName} size={size} color={color} />;
            } else {
              return <Ionicons name={iconName} size={size} color={color} />;
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: 'dodgerblue',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="List" component={List} options={{title: 'Lista'}} />
        <Tab.Screen name="Map" component={Map} options={{title: 'Mapa'}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}