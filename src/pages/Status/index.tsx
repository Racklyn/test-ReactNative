import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';

import { Line } from '../../components/Line';
import { PackageItem } from '../../components/PackageItem';

import { Package, useMain } from '../../hooks/main';


export function Status(){

    const navigation = useNavigation()

    const {
        savedPackages,
        currentPackage
    } = useMain()

    const [packagesList, setPackagesList] = useState<Package[]>([
        currentPackage,
        ...savedPackages.sort(function(a,b){return new Date(b.time).getTime() - new Date(b.time).getTime()})
    ])

    useEffect(()=>{
        let ordered = savedPackages.sort(function(a,b){return new Date(b.time).getTime() - new Date(a.time).getTime()})
        setPackagesList([currentPackage, ...ordered])
    },[currentPackage])

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
                data={packagesList}
                style={styles.packagesList}
                keyExtractor={pk=>pk.pkId}
                ListHeaderComponent = {()=> <Line/>}
                ItemSeparatorComponent = {()=> <Line/>}
                ListFooterComponent = {()=> <Line/>}
                contentContainerStyle={{paddingBottom: 68}}

                renderItem={({item:pk})=>(
                    <PackageItem
                        packageID = {pk.pkId}
                        isSynchronized = {pk.isSynchronized}
                        time = {pk.time}
                    />
                )}
            />

        </View>

    );
}