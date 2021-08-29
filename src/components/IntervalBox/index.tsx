import React from 'react';

import {Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';

import { styles } from './styles';

type Props = TouchableOpacityProps & {
    isSelected?: boolean;
    time: number
}

export function IntervalBox({isSelected=false, time, ...rest}:Props){
    return (
        <TouchableOpacity
            style={[styles.intervalBox, isSelected&&styles.intervalBoxSelected]}
            activeOpacity={0.65}
            {...rest}
        >
            <Text style={[styles.intervalBoxText, isSelected&&{color: '#45504d'}]}>{time}s</Text>
        </TouchableOpacity>
    );
}