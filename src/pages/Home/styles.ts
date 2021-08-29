import { StyleSheet } from 'react-native';
// import {getStatusBarHeight} from 'react-native-iphone-x-helper'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header:{
        height: 60,
        backgroundColor: '#1c1a83',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 18
    },
    headerMessage:{
        color: '#c2c0e0',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonGoToStatusText:{
        color: '#f8f6ff',
        fontSize: 17,
        fontWeight: 'bold',
    },

    titleContainer:{
        height: 120,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 26
    },
    heading:{
        marginLeft:20
    },
    title:{
        fontSize: 21,
        fontWeight: 'bold',
        color: '#45504d',
        marginBottom: 2
    },
    onlineText:{
        color: '#0ebb01',
        fontSize: 16,
        fontStyle: 'italic'
    },
    offlineText:{
        color: '#e92',
        fontSize: 16,
        fontStyle: 'italic'
    },
    

    statusContainer:{
        flexDirection: 'row',
        height: 135,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 26
    },

    strongText:{
        fontSize: 19,
        color: '#58605e',
        marginBottom: 4
    },
    lightText:{
        color: '#78807e'
    },


    intervalContainer:{
        paddingHorizontal: 26
    },
    intervals:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 6
    },
});