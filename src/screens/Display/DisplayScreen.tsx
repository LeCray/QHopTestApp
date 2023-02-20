import React, { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { createDataService } from '../../api/DataService';
import dynamicStyles from './styles'
import { useTheme, useFocusEffect } from '@react-navigation/native';
import { Input, Text } from 'react-native-elements';
import { color } from 'react-native-elements/dist/helpers';

const dataService = createDataService();

const DisplayScreen = () => {
  const [personData, setPersonData] = useState<PersonData>();
  const [contactData, setContactData] = useState<ContactData>();

  const { colors } = useTheme();
  const styles = dynamicStyles(colors)

  useFocusEffect(
    React.useCallback(() => {        
        const fetchPersonData = async () => {
            const data = await dataService.getPersonData();
            setPersonData(data);
        };
  
        const fetchContactData = async () => {
            const data = await dataService.getContactData();
            setContactData(data);
        };
  
        fetchPersonData();
        fetchContactData();

    }, [personData, contactData])
  );

  return (
    <ScrollView>
        <View style={{paddingBottom: 200}}>
        <Text style={styles.titles}>Person Data</Text>
        {personData && contactData ? (
            <>
                <Input                
                    value={personData.name}                                              
                    style={styles.input}
                    inputContainerStyle={{width: '90%', marginLeft: 10}}
                    disabled={true}
                    disabledInputStyle={{opacity: 1}}/>
                                
                <Input                
                    value={personData.surname}
                    style={styles.input}
                    inputContainerStyle={{width: '90%', marginLeft: 10}}
                    disabled={true}
                    disabledInputStyle={{opacity: 1}}/>
            </>
        ) : (
            <View style={{marginTop: 40}}>
                <ActivityIndicator size={35} color={colors.text} />
            </View>
        )}
        <Text style={styles.titles}>Contact Data</Text>
        {personData && contactData ? (
            <>
                <Input                
                    value={contactData.email}
                    leftIcon={{ type: 'fontisto', name: 'email', color: colors.text, size: 20}}    
                    style={styles.input} 
                    inputContainerStyle={{width: '90%', marginLeft: 10}}    
                    disabled={true}
                    disabledInputStyle={{opacity: 1}}/>
                <Input                
                    value={contactData.cell_no}
                    leftIcon={{ type: 'font-awesome', name: 'phone', color: colors.text  }}   
                    style={styles.input}  
                    disabledInputStyle={{opacity: 1}}     
                    inputContainerStyle={{width: '90%', marginLeft: 10}}                        
                    disabled={true}/>

            </>
        ) : (
            <View style={{marginTop: 40}}>
                <ActivityIndicator size={35} color={colors.text} />
            </View>
        )}        
        
        </View>
    </ScrollView>
  );
};

export default DisplayScreen;
