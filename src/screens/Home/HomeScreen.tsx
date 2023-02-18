import { StyleSheet, View, Text, Pressable, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
//import { useTheme } from 'react-native-elements';


const DATA = [
  {
    id: 1,
    name: 'Luke Skywalker',
    birth_year: '19BBY',
  },
  {
    id: 2,
    name: 'C-3PO',
    birth_year: '112BBY',
  },
  {
    id: 3,
    name: 'R2-D2',
    birth_year: '33BBY',
  },
  {
    id: 4,
    name: 'Darth Vader',
    birth_year: '41.9BBY',
  },
  {
    id: 5,
    name: 'Leia Organa',
    birth_year: '19BBY',
  },
];
const HomeScreen = () => {
  
    const { colors } = useTheme();

    return (
        <View style={{ flex: 1, paddingTop: 10}}>
            <Text>HOME SCREEN</Text>
            <Ionicons name='home' size={50} color={colors.primary} />
            <Ionicons name="rocket" size={30} color="#900" />
        </View>
    );

};

export default HomeScreen;