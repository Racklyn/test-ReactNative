import * as Location from 'expo-location'
import * as IntentLauncher from "expo-intent-launcher"
import {Platform, Linking, Alert} from 'react-native'


async function getLocation(){ 

    try {
        

        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
        }

        let location = await Location.getCurrentPositionAsync({});

        return location;


    } catch (error) {
        let status = await Location.getProviderStatusAsync()
        if(!status.locationServicesEnabled){
        
        Alert.alert("Abrir configurações de localização?", "",
        [
            {
            text: "Cancelar",
            onPress: ()=>{},
            style: "cancel"
            },
            {
            text: "Ok",
            onPress: ()=>{
                openGPSSettings()
            }
            }
        ])
        }

        
    }

}


function openGPSSettings(){
    if(Platform.OS=='ios'){
      Linking.openURL('app-settings')
    }else{
      // Open location settings
      IntentLauncher.startActivityAsync(IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS);
    }
    
}

export {getLocation, openGPSSettings}