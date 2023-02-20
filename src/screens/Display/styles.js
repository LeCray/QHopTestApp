import { StyleSheet } from 'react-native'
import { color } from 'react-native-elements/dist/helpers'


const dynamicStyles = (colors) => {    

    return new StyleSheet.create({
        input: {
            color: colors.text,
            fontSize: 17                            
        },
        inputContainer: {
            width: '80%'
        },
        titles: {
            color: colors.text,
            padding: 20,
            fontSize: 20,
            fontWeight: 'bold'
        },
        // button: {
        //     width: '80%',            
        //     alignSelf: 'center',
        //     marginTop: 30,            
        //     borderColor: colors.text,
        //     borderWidth: 1,
        //     height: 50
        // },
        button: {
            color: colors.text,
            fontSize: 15,
            fontWeight: 'bold',
            
        },
        buttonContainer: {
            marginTop: 20,
            padding:10, 
            height:45, 
            borderRadius:4,
            borderWidth: 1,
            borderColor: colors.primary,
            width: '80%',
            alignSelf: 'center'
        },
        saveText: {
            color: colors.primary,
            fontSize: 15
        },
        cancelText: {
            color: colors.text,
            fontSize: 15,            
        },
        cancelButtonContainer: {
            marginTop: 20,
            padding:10, 
            height:45, 
            borderRadius:4,
            borderWidth: 1,
            borderColor: colors.text,
            width: '80%',
            alignSelf: 'center'
        },

    })
}
export default dynamicStyles