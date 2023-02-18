import React, { useEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { createDataService } from '../../api/DataService';

const dataService = createDataService();

const CaptureScreen = () => {
  const [personData, setPersonData] = useState<PersonData>();
  const [contactData, setContactData] = useState<ContactData>();
  const [updatedPersonData, setUpdatedPersonData] = useState<Partial<PersonData>>({});
  const [updatedContactData, setUpdatedContactData] = useState<Partial<ContactData>>({});

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

  const handlePersonDataChange = (field: keyof PersonData, value: string) => {
    setUpdatedPersonData((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleContactDataChange = (field: keyof ContactData, value: string) => {
    setUpdatedContactData((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleSubmit = async () => {
    if (Object.keys(updatedPersonData).length > 0) {
      await dataService.updatePersonData(updatedPersonData);
    }
    if (Object.keys(updatedContactData).length > 0) {
      await dataService.updateContactData(updatedContactData);
    }
  };

  return (
    <View>
      <Text>Update Person Data:</Text>
      {personData ? (
        <>
          <TextInput
            value={updatedPersonData.name ?? personData.name}
            onChangeText={(value) => handlePersonDataChange('name', value)}
          />
          <TextInput
            value={updatedPersonData.surname ?? personData.surname}
            onChangeText={(value) => handlePersonDataChange('surname', value)}
          />
        </>
      ) : (
        <Text>Loading person data...</Text>
      )}
      <Text>Update Contact Data:</Text>
      {contactData ? (
        <>
          <TextInput
            value={updatedContactData.email ?? contactData.email}
            onChangeText={(value) => handleContactDataChange('email', value)}
          />
          <TextInput
            value={updatedContactData.cell_no ?? contactData.cell_no}
            onChangeText={(value) => handleContactDataChange('cell_no', value)}
          />
        </>
      ) : (
        <Text>Loading contact data...</Text>
      )}
      <Button title="Save" onPress={handleSubmit} />
    </View>
  );
};

export default CaptureScreen;
