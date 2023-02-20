import * as React from 'react';
import {
    useColorScheme,
  } from 'react-native';
import HomeScreen from '../screens/Home/HomeScreen';
import DisplayScreen from '../screens/Display/DisplayScreen';
import CaptureScreen from '../screens/Capture/CaptureScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const { colors }  = useTheme();    

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({                
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';                                
                    } else if (route.name === 'Display') {
                        iconName = focused ? 'book' : 'book-outline';
                    } else if (route.name === 'Capture') {
                        iconName = focused ? 'md-pencil' : 'md-pencil-outline';
                    }                
                    return <Ionicons name={iconName} size={size} color={focused ? colors.primary : colors.grey} />;
                },

                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.grey,
                tabBarHideOnKeyboard: true
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Display" component={DisplayScreen} />
            <Tab.Screen name="Capture" component={CaptureScreen} />
        </Tab.Navigator>
    );
};
export default TabNavigator;