import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Switch} from 'react-native';
import {Feather} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';

import { Line } from '../../components/Line';
import { IntervalBox } from '../../components/IntervalBox';

import { useMain } from '../../hooks/main';


let counterTimeOut: NodeJS.Timeout

export function Home(){

    const navigation = useNavigation()

    const {
        comInterval,
        setComInterval,
        serviceStatus,
        setServiceStatus,
        isOnline
    } = useMain()


    function goToStatusScreen(){

        //O trecho abaixo mostra que há um erro, porém está exatamente conforme a documentação do ...
        //... useNavigation em https://reactnavigation.org/docs/navigation-prop#navigate ... 
        //... e está funcionando normalmente sem apresentar erro algum durante a execução:
        navigation.navigate("Status")

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
                    {
                        isOnline
                        ?(<Text style={styles.onlineText}>Online</Text>)
                        :(<Text style={styles.offlineText}>Offline</Text>)
                    }
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
                    {
                        [10,5,3,1].map((time)=>(
                            <IntervalBox
                                key={time}
                                time={time}
                                isSelected={time===comInterval}
                                onPress={()=>{setComInterval(time)}}
                            />
                        ))
                    }
                    
                </View>
            </View>
        </View>
    );
}