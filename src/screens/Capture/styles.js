import { StyleSheet } from 'react-native'


const dynamicStyles = (colors) => {    

    return new StyleSheet.create({
        input: {
            color: colors.text
        },
        titles: {
            color: colors.text,
            padding: 20,
            fontSize: 20,
            fontWeight: 'bold'
        },
        button: {
            width: '80%',            
            alignSelf: 'center',
            marginTop: 30,            
            borderColor: colors.text,
            borderWidth: 1
        },
        cancelBtn: {
            width: '80%',
            alignSelf: 'center',
            marginTop: 30,
            borderColor: colors.text,
            borderWidth: 1
        }

    })
}
export default dynamicStyles
