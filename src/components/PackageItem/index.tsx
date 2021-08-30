import React, {useEffect, useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {View, Text} from 'react-native';

import { styles } from './styles';
import { getHoursFromDate } from '../../utils/getCurrentTimeString';

type Props = {
    packageID: string;
    isSynchronized: boolean;
    time: string;
}

export function PackageItem({packageID, isSynchronized, time}:Props){

    const  d = new Date(time)
    const now = new Date()
    const [sameDay, setSameDay] = useState(d.getDate()==now.getDate())
    const [timeText, setTimeText] = useState(time)

    useFocusEffect(()=>{
        if(timeText.toUpperCase()!="AGORA"){
            setTimeText(getHoursFromDate(d))
        }else{
            setSameDay(true)
        }
    })

    return (
        <View style={styles.packageItem}>
            <View>
                <Text style={styles.strongText}>Pacote ID: {packageID}</Text>

                {isSynchronized
                ?(<Text style={styles.lightText}>Sincronizado</Text>)
                :(
                    <Text style={styles.lightText}>
                        {timeText.toUpperCase()=="AGORA"?"Monitorando localização":"Pendente sincronizar"}
                    </Text>)
                }

            </View>
            
            {sameDay
                ?(<Text style={styles.syncTime}>{timeText}</Text>)
                :
                (   
                    <View style={styles.syncTimeContainer}>
                        <Text style={styles.syncTimeSmall}>
                            {time.split(' ')[0]}
                        </Text>
                        <Text style={styles.syncTimeSmall}>
                            {timeText}
                        </Text>
                    </View>
                )
            }
            
        </View>
    );
}