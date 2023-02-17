import * as React from 'react';
import HomeScreen from '../screens/Home/HomeScreen';
import DisplayScreen from '../screens/Display/DisplayScreen';
import CaptureScreen from '../screens/Capture/CaptureScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Display" component={DisplayScreen} />
        <Tab.Screen name="Capture" component={CaptureScreen} />
    </Tab.Navigator>
  );
};
export default TabNavigator;