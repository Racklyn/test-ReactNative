import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react'
import {getLocation} from '../utils/gpsLocationModule'
import NetInfo from '@react-native-community/netinfo'

type LocationItem = {
    id: string;
    latitude: number;
    longitude: number;
    speed: number;
    time: string;
}
type Packages = {
    pkId: string;
    packages: LocationItem[];
    time: string;
}

type MainContextData = {
    locationItem: LocationItem;
    comInterval: number;
    setComInterval: (n:number) => void;
    serviceStatus: boolean;
    setServiceStatus: (s:boolean) => void;
    isOnline: boolean
}

type MainProviderProps = {
    children: ReactNode,
}


const MainContext = createContext({} as MainContextData)



let counterTimeOut: NodeJS.Timeout

function MainProvider({children}:MainProviderProps){

    const [locationItem, setLocationItem] = useState<LocationItem>({} as LocationItem)

    const [comInterval, setComInterval] = useState(10) //Intervalo de comunicação (em segundos)
    const [timeCounter, setTimeCounter] = useState(comInterval) //contador

    const [serviceStatus, setServiceStatus] = useState(false)
    const [isOnline, setIsOnline] = useState(false)

    const [savedPackages, setSavedPackages] = useState<Packages[]>([])


    //Contagem:
    useEffect(()=>{

        if(serviceStatus){
            counterTimeOut = setTimeout(()=>{
                if(timeCounter>0){
                    setTimeCounter(timeCounter-1)

                    if(timeCounter===comInterval-1){
                        getLocation().then((loc)=>{
                            console.log(loc) //APAGAR
                        })
                    }
                    
                }else{
                    setTimeCounter(comInterval-1)
                }
            },1000)
            console.log(timeCounter) //APAGAR
        }

    },[timeCounter, serviceStatus])

    useEffect(()=>{
        if(!serviceStatus){
            setTimeCounter(comInterval)
            clearTimeout(counterTimeOut)
        }
    },[serviceStatus])

    //Atualizando contador quando o intervalo de comunicação for alterado:
    useEffect(()=>{
        setTimeCounter(comInterval-1)
        clearTimeout(counterTimeOut)
    }, [comInterval])


    //Detectando alterações na conexão com INTERNET:
    useEffect(()=>{
    
        NetInfo.addEventListener(state => {
            setIsOnline(state.isConnected?true:false);
        
            //Assim que a net for ligada, sincronizar pacotes
            //synchronizePackages(state.isConnected?true:false)
        });
    
    },[])



    return (
        <MainContext.Provider value={
            {
                locationItem,
                comInterval,
                setComInterval,
                serviceStatus,
                setServiceStatus,
                isOnline
            }
        }>
            {children}
        </MainContext.Provider>
    )
}



function useMain(){
    const context = useContext(MainContext)

    return context
}


export {
    MainContext,
    MainProvider,
    useMain
}