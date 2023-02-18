import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { createDataService } from '../../api/DataService';

const dataService = createDataService();

const DisplayScreen = () => {
  const [personData, setPersonData] = useState<PersonData>();
  const [contactData, setContactData] = useState<ContactData>();

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

  return (
    <View>
      <Text>Person Data:</Text>
      {personData ? (
        <>
          <Text>Name: {personData.name}</Text>
          <Text>Surname: {personData.surname}</Text>
        </>
      ) : (
        <Text>Loading person data...</Text>
      )}
      <Text>Contact Data:</Text>
      {contactData ? (
        <>
          <Text>Email: {contactData.email}</Text>
          <Text>Cell No: {contactData.cell_no}</Text>
        </>
      ) : (
        <Text>Loading contact data...</Text>
      )}
    </View>
  );
};

export default DisplayScreen;
