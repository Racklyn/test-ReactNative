import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  intervalBox:{
    height: 60,
    width: '21%',
    borderWidth: 1,
    borderColor: '#a6abb3',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center'
    },
    intervalBoxSelected:{
        backgroundColor: '#edf3f2',
        borderColor: '#0ebb01',
    },
    intervalBoxText:{
        color: '#a6abb3',
        fontSize: 17,
        fontWeight: 'bold'
    }
});