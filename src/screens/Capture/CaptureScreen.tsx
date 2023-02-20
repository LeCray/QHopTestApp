import React, { useEffect, useState, useRef } from 'react';
import { View, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { createDataService } from '../../api/DataService';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Text } from 'react-native-elements';
import dynamicStyles from './styles'
import { useTheme, useFocusEffect } from '@react-navigation/native';
import Button from 'react-native-button'
import validator from 'validator'
import { isValidPhoneNumber } from 'react-phone-number-input'

const dataService = createDataService();

const CaptureScreen = () => {
    const [personData, setPersonData] = useState();
    const [contactData, setContactData] = useState();
    const [updatedPersonData, setUpdatedPersonData] = useState({});
    const [updatedContactData, setUpdatedContactData] = useState({});
    const [loading, setLoading] = useState(false)
    const [showButtons, setShowButtons] = useState(false)

    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [cell_no, setCellno] = useState("")

    const { colors } = useTheme();
    const styles = dynamicStyles(colors)

    useEffect(() => {
        const fetchPersonData = async () => {
            const data = await dataService.getPersonData();
            setPersonData(data);
            setName(data.name)            
            setSurname(data.surname)                        
        };

        const fetchContactData = async () => {
            const data = await dataService.getContactData();
            setContactData(data);
            setEmail(data.email)
            setCellno(data.cell_no)
            //console.log("ContactData: ", contactData.email)
        };

        fetchPersonData();
        fetchContactData();
            
    }, []);

    const handleSubmit = async () => {        

        if (!name) { setName("Michael")}
        if (!surname) {setSurname("Baker")}
        if (!email) {setEmail("michael@test.com")}
        if (!cell_no) {setCellno("0825558364")}

        if (!validator.isEmail(email)) {
            Alert.alert(
                'Invalid email', 
                'Please make sure the email address is correct.', 
                [{text: 'OK'}]
            );             
        } else if (!isValidPhoneNumber(cell_no)) {
            Alert.alert(
                'Invalid cell number', 
                'Check the length, and include the country code (e.g. +27).', 
                [{text: 'OK'}]
            );             
        }  else {
            setUpdatedPersonData({name: name, surname: surname})
            setUpdatedContactData(() => ({email: email, cell_no: cell_no}))

            setLoading(true)

            await dataService.updatePersonData({name: name, surname: surname});    
            await dataService.updateContactData({email: email, cell_no: cell_no});
        
            //refresh()
            setShowButtons(false)
            setLoading(false)        
            Alert.alert(
                '', 
                'Details updated successfully', 
                [{text: 'Done'}]
            );                               
        }          
    };

    const handleCancel = async () => {
        const fetchPersonData = async () => {
            const data = await dataService.getPersonData();
            setPersonData(data);
            setName(data.name)            
            setSurname(data.surname)                        
        };

        const fetchContactData = async () => {
            const data = await dataService.getContactData();
            setContactData(data);
            setEmail(data.email)
            setCellno(data.cell_no)
            //console.log("ContactData: ", contactData.email)
        };

        fetchPersonData();
        fetchContactData();
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
                    value={name}                                  
                    onChangeText={(value) => {
                        setName(value)
                        setShowButtons(true)
                    }}
                    
                    style={styles.input}
                    inputContainerStyle={{width: '90%', marginLeft: 10}}
                    placeholder='First name'
                    onSubmitEditing={() => {
                        lastNameRef.current.focus();
                        }}
                        blurOnSubmit={false}
                    />
                <Input                
                    value={surname}                                
                    onChangeText={(value) => {
                        setSurname(value)
                        setShowButtons(true)
                    }}
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
                <View style={{marginTop: 40}}>
                    <ActivityIndicator size={35} color={colors.text} />
                </View>
            )}
            <Text style={styles.titles}>Update Contact Data</Text>
            {contactData ? (
                <>
                    <Input                
                        value={email}
                        onChangeText={(value) => {
                            setEmail(value)
                            setShowButtons(true)
                        }}
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
                        value={cell_no}
                        onChangeText={(value) => {
                            setCellno(value)
                            setShowButtons(true)
                        }}
                        leftIcon={{ type: 'font-awesome', name: 'phone', color: colors.text  }}   
                        style={styles.input}     
                        inputContainerStyle={{width: '90%', marginLeft: 10}}                        
                        placeholder='Cell no'
                        ref={cellNoRef}
                        keyboardType = 'numeric'
                        />

                </>
            ) : (
                <View style={{marginTop: 40}}>
                    <ActivityIndicator size={35} color={colors.text} />
                </View>
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
