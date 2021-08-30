import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react'
import { Alert } from 'react-native'
import {getLocation} from '../utils/gpsLocationModule'
import NetInfo from '@react-native-community/netinfo'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { getCurrentTimeString } from '../utils/getCurrentTimeString'
import {CURRENT_PACKAGE, SAVED_PACKAGES} from '../configs/database'
import { getRandomID } from '../utils/getRandomID'

import {api} from '../services/api'



type LocationItem = {
    id: string;
    latitude: number;
    longitude: number;
    speed: number;
    time: string;
}
export type Package = {
    pkId: string;
    itens: LocationItem[];
    isSynchronized: boolean;
    time: string;
}


type MainContextData = {
    locationItem: LocationItem;
    comInterval: number;
    setComInterval: (n:number) => void;
    serviceStatus: boolean;
    setServiceStatus: (s:boolean) => void;
    isOnline: boolean;
    currentPackage: Package;
    setCurrentPackage: (pk:Package) => void;
    savedPackages: Package[];
}

type MainProviderProps = {
    children: ReactNode,
}


const MainContext = createContext({} as MainContextData)



let counterTimeOut: NodeJS.Timeout

function MainProvider({children}:MainProviderProps){

    const inactivatedTime = 120 //tempo em segundos
    

    const [locationItem, setLocationItem] = useState<LocationItem>({} as LocationItem)
    const [currentPackage, setCurrentPackage] = useState<Package>({} as Package)
    const [savedPackages, setSavedPackages] = useState<Package[]>([])

    const [comInterval, setComInterval] = useState(10) //Intervalo de comunicação (em segundos)
    const [timeCounter, setTimeCounter] = useState(comInterval) //contador

    const [serviceStatus, setServiceStatus] = useState(false)
    const [isOnline, setIsOnline] = useState(false)



    //Contagem:
    useEffect(()=>{

        if(serviceStatus){
            counterTimeOut = setTimeout(()=>{
                if(timeCounter>0){
                    if(timeCounter===comInterval){
                        

                        let timeString = getCurrentTimeString()
            
                        let currTimestamp = Math.round(new Date(timeString).getTime()/1000)
                        let lastTimestamp = currTimestamp

                
                        // para não correr o risco de ser 'undefined'
                        let pkItens =  currentPackage.itens?currentPackage.itens:[]
            
                        if(pkItens.length>0){
                            //tempo em string:
                            let lastTime = pkItens[pkItens.length-1].time
                            lastTimestamp = Math.round(new Date(lastTime).getTime()/1000)    
                        }
                        
                        //se o usuário ficou inativo por mais de 2 minutos ou o status ainda está ativado
                        if((currTimestamp-lastTimestamp)>inactivatedTime){

                            closeCurrentPackage()
                            synchronizePackages()

                        }else{
                            let lat = 0
                            let long = 0
                            let speed = 0
                            
                            getLocation().then((loc)=>{
                                let coords = loc?.coords
                                if (coords?.latitude) { lat = coords.latitude }
                                if (coords?.longitude) { long = coords.longitude }
                                if (coords?.speed) { speed = coords.speed }
                            }).then(()=>{

                                
                                let randomId = getRandomID()
                                
                                pkItens.push({
                                    id: randomId,
                                    latitude: lat,
                                    longitude: long,
                                    speed: speed,
                                    time: timeString,
                                })
                                let currPk = currentPackage
                                currPk.itens = pkItens

                                setCurrentPackage(currPk)

                                //Salvando pacote atual localmente:
                                saveCurrentPackage(currPk)
                            })
                            
                        }

                    }
                    setTimeCounter(timeCounter-1)

                }else{
                    setTimeCounter(comInterval)
                }
            },1000)
            // console.log(timeCounter)
        }

    },[timeCounter, serviceStatus])


    //Detectando alterações na conexão com INTERNET:
    useEffect(()=>{

        NetInfo.addEventListener(state => {
            setIsOnline(state.isConnected?true:false);
        
            //Assim que a internet for ligada, sincronizar pacotes
            synchronizePackages()
        });

        // deleteLocalPackages() //APAGAR ARMAZENAMENTO LOCAL

        getCurrentPackage().then((currPks)=>{
            setCurrentPackage(currPks)
        })

        getSavedPackages().then((savedPks)=>{
            setSavedPackages(savedPks)
        })

    },[])

    useEffect(()=>{
        if(!serviceStatus && currentPackage.itens?.length>0){
            closeCurrentPackage()
            synchronizePackages()
        }
    },[serviceStatus])

    //Atualizando contador quando o intervalo de comunicação for alterado:
    useEffect(()=>{
        clearTimeout(counterTimeOut)
        setTimeCounter(comInterval)
    }, [comInterval])




    async function savePackages(savedPks: Package[]) {
        await AsyncStorage.setItem(SAVED_PACKAGES, JSON.stringify(savedPks))
    }

    async function saveCurrentPackage(currPk: Package) {
        await AsyncStorage.setItem(CURRENT_PACKAGE, JSON.stringify(currPk))
    }

    async function getCurrentPackage() {
        const storage = await AsyncStorage.getItem(CURRENT_PACKAGE)
        let currPk = {} as Package
        if (storage){
            currPk = JSON.parse(storage)
        }else{
            let id = getRandomID()
            currPk = {
                pkId: id,
                itens: [],
                time: 'Agora',
                isSynchronized: false
            }
        }
        
        return currPk
    }

    async function getSavedPackages() {
        const storage = await AsyncStorage.getItem(SAVED_PACKAGES)
        let savedPks = [] as Package[]
        if (storage){
            savedPks = JSON.parse(storage)
        }
        return savedPks
    }

    async function closeCurrentPackage() {
        let currPks = await getCurrentPackage()
        let savedPks = await getSavedPackages()

        currPks.time = getCurrentTimeString()
        savedPks.push(currPks)
        let id = getRandomID()
        let NewCurrPks = {
            pkId: id,
            itens: [],
            time: 'Agora',
            isSynchronized: false
        }

        //Atualizando pacote atual
        saveCurrentPackage(NewCurrPks)
        setCurrentPackage(NewCurrPks)

        //Atualizando pacotes salvos
        savePackages(savedPks)
        setSavedPackages(savedPks)

        // console.log(`${savedPackages.length} pacotes salvos no dispositivo!`)

        clearTimeout(counterTimeOut)
        setTimeCounter(comInterval)
    }

    async function synchronizePackages(){

        if(isOnline){

            try {
                const response = await api.get('/points/')
                const uploadedPksIds = response.data

                savedPackages.forEach(async (pkg)=>{
                    
                // se ID do pacote NÃO estiver na lista dos que já foram sincronizados
                    if(!uploadedPksIds.includes(pkg.pkId)){
                        //Aqui será feita a requisição (POST), mandando o pacote para o server
                        await api.post(`/points/${pkg.pkId}`, pkg.itens)
                        // console.log(`Pac. sincronizado. N° de pacotes: ${uploadedPksIds.length}`)
                    }
                })

                //Atualizando pacotes locais com os dados do servidor:
                const newResponse = await api.get('/points')
                const uploadedPackagesIds = newResponse.data

                let syncPackages = savedPackages
                uploadedPackagesIds.forEach(async (pkID:string) => {
                    const resp = await api.get(`/points/${pkID}`)
                    const itens: LocationItem[] = resp.data

                    let sPackage = {
                        pkId: pkID,
                        itens: itens,
                        time: itens[-1].time,
                        isSynchronized: true
                    }
                    syncPackages = [...syncPackages, sPackage]
                });

                
                savePackages(syncPackages)
                setSavedPackages(syncPackages)

                // console.log("ITENS SINCRONIZADOS")
            } catch (error) {
                console.log(error)

                Alert.alert("Servidor indisponível :(",
                            "Alguns pacotes não foram sincronizados. Assim que o servidor estiver "+
                            "disponível, todos os pacotes serão sincronizados automaticamente!")
            }
        
        }
    }

    async function deleteLocalPackages() {
        await AsyncStorage.removeItem(SAVED_PACKAGES)
    }



    return (
        <MainContext.Provider value={
            {
                locationItem,
                comInterval,
                setComInterval,
                serviceStatus,
                setServiceStatus,
                isOnline,
                currentPackage,
                setCurrentPackage,
                savedPackages
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