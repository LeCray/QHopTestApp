import { StyleSheet, View, Text, Pressable, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import dynamicStyles from './styles'

const HomeScreen = () => {
  
    const { colors } = useTheme();
    const styles = dynamicStyles(colors)

    interface ListItem {
        id: number;
        label: string;
      }

    const generateListItems = (): ListItem[] => {
        const items: ListItem[] = [];
      
        for (let i = 1; i <= 1000; i++) {
          if (i % 100 === 0) {
            items.push({ id: i, label: 'beep boop' });
          } else if (i % 20 === 0) {
            items.push({ id: i, label: 'boop' });
          } else if (i % 5 === 0) {
            items.push({ id: i, label: 'beep' });
          } else {
            items.push({ id: i, label: i.toString() });
          }
        }
      
        return items;
      };
      
      const ListItemView = ({ label }: { label: string }) => (
        <View style={{ padding: 10 }}>
          <Text style={{color: colors.text}}>{label}</Text>
        </View>
      );

    const items = generateListItems();

    return (
        <View style={{ flex: 1, paddingTop: 10}}>
            <FlatList
                data={items}
                renderItem={({ item }) => <ListItemView label={item.label} />}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );

};

export default HomeScreen;