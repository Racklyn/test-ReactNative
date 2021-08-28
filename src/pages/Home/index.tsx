import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Switch} from 'react-native';
import {Feather} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';

import { Line } from '../../components/Line';

export function Home(){

    const navigation = useNavigation()

    const [serviceStatus, setServiceStatus] = useState(true)

    function goToStatusScreen(){
        navigation.navigate('Status')
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headerMessage}>Olá, bem-vindo</Text>
                <TouchableOpacity
                    onPress={goToStatusScreen}
                >
                    <Text style={styles.buttonGoToStatusText}>Status</Text>
                </TouchableOpacity>
            </View>

        
            <View style={styles.titleContainer}>
                <Feather name="compass" size={60} color="#2b2a8c" />
                <View style={styles.heading}>
                    <Text style={styles.title}>My GPS - Tracking</Text>
                    <Text style={styles.onlineText}>Online</Text>
                </View>
            </View>

            <Line/>

            <View style={styles.statusContainer}>
                <View>
                    <Text style={styles.strongText}>Status do serviço</Text>
                    <Text style={styles.lightText}>{serviceStatus?"Serviço ativo":"Serviço inativo"}</Text>
                </View>
                <Switch
                    trackColor={{ false: "#868587", true: "#d1d0d9" }}
                    thumbColor={serviceStatus ? "#0fbb01" : "#f4f3f4"}
                    ios_backgroundColor="#555"
                    onValueChange={()=>setServiceStatus(!serviceStatus)}
                    value={serviceStatus}
                />
            </View>

            <View style={styles.intervalContainer}>
                <Text style={styles.strongText}>Intervalo de comunicação</Text>
                <View style={styles.intervals}>
                    <TouchableOpacity style={[styles.intervalBox, styles.intervalBoxSelected]}>
                        <Text style={[styles.intervalBoxText, {color: '#45504d'}]}>10s</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.intervalBox]}>
                        <Text style={[styles.intervalBoxText]}>5s</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.intervalBox]}>
                        <Text style={[styles.intervalBoxText]}>3s</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.intervalBox]}>
                        <Text style={[styles.intervalBoxText]}>1s</Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
        </View>
    );
}