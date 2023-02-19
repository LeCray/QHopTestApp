    import React, { useEffect, useState } from 'react';
    import { View, ScrollView, Alert } from 'react-native';
    import { createDataService } from '../../api/DataService';
    import Icon from 'react-native-vector-icons/FontAwesome';
    import { Input, Text } from 'react-native-elements';
    import dynamicStyles from './styles'
    import { useTheme } from '@react-navigation/native';
    import Button from 'react-native-button'

    const dataService = createDataService();

    const CaptureScreen = () => {
        const [personData, setPersonData] = useState();
        const [contactData, setContactData] = useState();
        const [updatedPersonData, setUpdatedPersonData] = useState({});
        const [updatedContactData, setUpdatedContactData] = useState({});
        const [loading, setLoading] = useState(false)
        const [showButtons, setShowButtons] = useState(false)

        const { colors } = useTheme();
        const styles = dynamicStyles(colors)

        useEffect(() => {
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
        }, []);

    const handlePersonDataChange = (field, value) => {
        setShowButtons(true)
        setUpdatedPersonData((prevState) => ({ ...prevState, [field]: value }));
    };

    const handleContactDataChange = (field, value) => {
        setShowButtons(true)
        setUpdatedContactData((prevState) => ({ ...prevState, [field]: value }));
    };

    const handleSubmit = async () => {
        console.log("Person Data: ", updatedPersonData.name)
        if (updatedPersonData.name === "") {

            Alert.alert('Alert Title', 'My Alert Msg', [
                {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);

        }
        if (Object.keys(updatedPersonData).length > 0) {
        await dataService.updatePersonData(updatedPersonData);
        }
        if (Object.keys(updatedContactData).length > 0) {
        await dataService.updateContactData(updatedContactData);
        }
    };

    const handleCancel = async () => {
            setUpdatedPersonData({})
            setUpdatedContactData({})      
    }

    return (
        <ScrollView>
            <View style={{paddingBottom: 100}}>
            <Text style={styles.titles}>Update Person Data</Text>
            {personData ? (
                <>
                <Input                
                    value={updatedPersonData.name ?? personData.name}
                    leftIcon={{ type: 'font-awesome', name: 'user', color: colors.text }}                
                    onChangeText={(value) => handlePersonDataChange('name', value)}
                    style={styles.input}
                    />
                <Input                
                    value={updatedPersonData.surname ?? personData.surname}
                    leftIcon={{ type: 'font-awesome', name: 'user', color: colors.text  }}                
                    onChangeText={(value) => handlePersonDataChange('surname', value)}
                    style={styles.input}
                    />
                </>
            ) : (
                <Text>Loading person data...</Text>
            )}
            <Text h4 style={styles.titles}>Update Contact Data:</Text>
            {contactData ? (
                <>
                <Input                
                        value={updatedContactData.email ?? contactData.email}
                        onChangeText={(value) => handleContactDataChange('email', value)}
                        leftIcon={{ type: 'fontisto', name: 'email', color: colors.text  }}    
                        style={styles.input}                            
                        />
                    <Input                
                        value={updatedContactData.cell_no ?? contactData.cell_no}
                        onChangeText={(value) => handleContactDataChange('cell_no', value)}
                        leftIcon={{ type: 'font-awesome', name: 'comment', color: colors.text  }}   
                        style={styles.input}                             
                        />
                </>
            ) : (
                <Text h4 style={styles.titles}>Loading contact data...</Text>
            )}
            {showButtons && 
                <View>
                    <Button 
                        title="Save"
                        type="outline" 
                        onPress={handleSubmit} 
                        buttonStyle={styles.button}
                        titleStyle={{color: colors.text}}
                        loading={loading}
                        loadingProps={{color: colors.primary}}
                        />                
                    <Button 
                        title="Cancel"
                        type="outline" 
                        onPress={handleCancel} 
                        buttonStyle={styles.cancelBtn}
                        titleStyle={{color: colors.text}}
                        loading={loading}
                        loadingProps={{color: colors.primary}}
                        />
                </View>
            }
            </View>
        </ScrollView>
    );
    };

    export default CaptureScreen;
