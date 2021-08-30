import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header:{
        height: 60,
        backgroundColor: '#1c1a83',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 18,
        position: 'relative'
    },
    buttonBackToHome:{
        position: 'absolute',
        left: 18
    },
    buttonBackToHomeText:{
        color: '#f8f6ff',
        fontSize: 17,
        fontWeight: 'bold',
    },
    headerTitle:{
        color: '#c2c0e0',
        fontSize: 16,
        fontWeight: 'bold',
    },

    packagesList:{
        padding: 18
    },
});