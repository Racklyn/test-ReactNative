import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    packageItem:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12
    },
    strongText:{
        fontSize: 19,
        color: '#4c5553',
        marginBottom: 4
    },
    lightText:{
        color: '#68706e'
    },
    syncTime:{
        color: '#78807e',
        fontSize: 16
    },

    syncTimeContainer:{
        alignItems: 'flex-end'
    },
    syncTimeSmall:{
        color: '#78807e',
        fontSize: 14,
    }
});