import { StyleSheet } from 'react-native'


const dynamicStyles = (colors) => {    

    return new StyleSheet.create({
        item: {
            backgroundColor: colors.card,
            flex: 1,
        }

    })
}
export default dynamicStyles
