import * as React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import { useColorScheme } from 'react-native';

const RootNavigator = () => {
    const scheme = useColorScheme();
    
    return (
        <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
            <TabNavigator />
        </NavigationContainer>
    );
};

export default RootNavigator;