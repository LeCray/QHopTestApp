import AsyncStorage from '@react-native-async-storage/async-storage';

interface PersonData {
    name: string;
    surname: string;
}

interface ContactData {
    email: string;
    cell_no: string;
}

interface DataService {
    getPersonData: () => Promise<PersonData>;
    getContactData: () => Promise<ContactData>;
    updatePersonData: (data: PersonData) => Promise<void>;
    updateContactData: (data: ContactData) => Promise<void>;
}

const PERSON_DATA_KEY = 'personData';
const CONTACT_DATA_KEY = 'contactData';

const samplePersonData = (): PersonData => ({
    name: 'Michael',
    surname: 'Baker',
});

const sampleContactData = (): ContactData => ({
    email: 'michael@test.com',
    cell_no: '0825558364',
});

const storeData = async (key: string, data: any) => {    
    await AsyncStorage.setItem(key, JSON.stringify(data));
};

const getData = async (key: string) => {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
};

export const createDataService = (): DataService => {
    const getPersonData = async () => {
        let data = await getData(PERSON_DATA_KEY);
        if (!data) {
            data = samplePersonData();
            await storeData(PERSON_DATA_KEY, data);
        }
        return data;
    };

    const getContactData = async () => {
        let data = await getData(CONTACT_DATA_KEY);
        if (!data) {
            data = sampleContactData();
            await storeData(CONTACT_DATA_KEY, data);
        }
        return data;
    };

    const updatePersonData = async (data: PersonData) => {     
        console.log("Person update: ", data)   
        await storeData(PERSON_DATA_KEY, data);
    };

    const updateContactData = async (data: ContactData) => {
        console.log("Contact update: ", data)
        await storeData(CONTACT_DATA_KEY, data);
    };

    return {
        getPersonData,
        getContactData,
        updatePersonData,
        updateContactData,
    };
};
