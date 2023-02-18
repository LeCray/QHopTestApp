/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  useColorScheme,
} from 'react-native';
import RootNavigator from './src/navigation';
import { ThemeProvider } from 'react-native-elements';


function App(): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    console.log("Darkk: ", isDarkMode)

  return (      
        // <ThemeProvider useDark={isDarkMode}>
            <RootNavigator />
        // </ThemeProvider>          
    );
}


export default App;


