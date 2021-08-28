import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';

import { Line } from '../../components/Line';

export function Status(){

    const navigation = useNavigation()

    return (

        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.buttonBackToHome}
                    onPress={()=>{navigation.goBack()}}
                >
                    <Text style={styles.buttonBackToHomeText}>Voltar</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Status</Text>
            </View>

            <FlatList
                data={[1,2,3]}
                style={styles.packagesList}
                keyExtractor={item=>item.toString()}
                ListHeaderComponent = {()=> <Line/>}
                ItemSeparatorComponent = {()=> <Line/>}
                ListFooterComponent = {()=> <Line/>}
                contentContainerStyle={{paddingBottom: 68}}

                renderItem={(item)=>(
                    <View style={styles.packageItem}>
                        <View>
                            <Text style={styles.strongText}>Pacote ID: XXXXX</Text>
                            <Text style={styles.lightText}>Pendente sincronizar</Text>
                        </View>
                        <Text style={styles.syncTime}>13:12</Text>
                    </View>
                )}
            />

        </View>

    );
}