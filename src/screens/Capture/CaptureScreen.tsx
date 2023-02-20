import React, { useEffect, useState, useRef } from 'react';
import { View, ScrollView, Alert, ActivityIndicator } from 'react-native';
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

    const refresh = () => {
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
        Alert.alert(
            '', 
            'Details updated successfully', 
            [{text: 'Done'}]
        ); 
        setLoading(false)
    }

    const handlePersonDataChange = (field, value) => {
        setShowButtons(true)
        setUpdatedPersonData((prevState) => ({ ...prevState, [field]: value }));
    };

    const handleContactDataChange = (field, value) => {
        setShowButtons(true)
        setUpdatedContactData((prevState) => ({ ...prevState, [field]: value }));
    };

    const handleSubmit = async () => {
        //console.log("Person Data: ", updatedPersonData.name)

        if (
            updatedPersonData.name === "" || updatedPersonData.surname === "" ||
            updatedPersonData.email === "" || updatedPersonData.cell_no === ""
        ) {
            Alert.alert(
                '', 
                'All fields are necessary', 
                [{text: 'OK'}]
            );                        
            return
        } else {

            setLoading(true)

            if (Object.keys(updatedPersonData).length > 0) {
                await dataService.updatePersonData(updatedPersonData);
            }
            if (Object.keys(updatedContactData).length > 0) {
                await dataService.updateContactData(updatedContactData);
            }

            refresh()
        }                
    };

    const handleCancel = async () => {
        setUpdatedPersonData({})
        setUpdatedContactData({})
        setShowButtons(false)
    }

    const lastNameRef = useRef();
    const emailRef = useRef();
    const cellNoRef = useRef();

    return (
        <ScrollView>
            <View style={{paddingBottom: 200}}>
            <Text style={styles.titles}>Update Person Data</Text>
            {personData ? (
                <>
                <Input                
                    value={updatedPersonData.name ?? personData.name}                                  
                    onChangeText={(value) => handlePersonDataChange('name', value)}
                    style={styles.input}
                    inputContainerStyle={{width: '90%', marginLeft: 10}}
                    placeholder='First name'
                    onSubmitEditing={() => {
                        lastNameRef.current.focus();
                        }}
                        blurOnSubmit={false}
                    />
                <Input                
                    value={updatedPersonData.surname ?? personData.surname}                                
                    onChangeText={(value) => handlePersonDataChange('surname', value)}
                    style={styles.input}
                    inputContainerStyle={{width: '90%', marginLeft: 10}}
                    placeholder='Last name'
                    ref={lastNameRef}
                    onSubmitEditing={() => {
                        emailRef.current.focus();
                        }}
                        blurOnSubmit={false}
                    />
                </>
            ) : (
                <Text>Loading person data...</Text>
            )}
            <Text style={styles.titles}>Update Contact Data</Text>
            {contactData ? (
                <>
                    <Input                
                        value={updatedContactData.email ?? contactData.email}
                        onChangeText={(value) => handleContactDataChange('email', value)}
                        leftIcon={{ type: 'fontisto', name: 'email', color: colors.text, size: 20}}    
                        style={styles.input} 
                        inputContainerStyle={{width: '90%', marginLeft: 10}}    
                        placeholder='Email'   
                        ref={emailRef}
                        onSubmitEditing={() => {
                            cellNoRef.current.focus();
                            }}
                            blurOnSubmit={false}
                        />
                    <Input                
                        value={updatedContactData.cell_no ?? contactData.cell_no}
                        onChangeText={(value) => handleContactDataChange('cell_no', value)}
                        leftIcon={{ type: 'font-awesome', name: 'phone', color: colors.text  }}   
                        style={styles.input}     
                        inputContainerStyle={{width: '90%', marginLeft: 10}}                        
                        placeholder='Cell no'
                        ref={cellNoRef}
                        keyboardType = 'numeric'
                        />

                </>
            ) : (
                <Text style={styles.titles}>Loading contact data...</Text>
            )}
            
            {loading? 
                <View style={{marginTop: 40}}>
                    <ActivityIndicator size={35} color={colors.text} />
                </View>
            : showButtons &&
                <View>
                    <Button
                        containerStyle={styles.buttonContainer}
                        style={styles.saveText}
                        onPress={() => handleSubmit()}>
                        Save
                    </Button>   
                    <Button 
                        containerStyle={styles.cancelButtonContainer}
                        style={styles.cancelText}
                        onPress={handleCancel}>
                        Cancel
                    </Button>
                        
                </View>
            }
            
            </View>
        </ScrollView>
    );
};

export default CaptureScreen;
