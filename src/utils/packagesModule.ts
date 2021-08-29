import { useMain } from "../hooks/main"

const {
    comInterval,
    setComInterval,
    serviceStatus,
    setServiceStatus,
    isOnline
} = useMain()

function synchronizePackages() {
    
    // se estiver com internet. Na prática, essa parte deverá está envolvida em um try
    if(isOnline){
        // uploadedPackagesIds = .... da requisição

        // savedPackages.forEach((pkg, id)=>{
        // se ID do pacote NÃO estiver na lista dos que já foram sincronizados
        // if(!uploadedPackagesIds.includes(id)){
            //Aqui será feita a requisição (POST), mandando o pacote para o server
        //   let upPkgsIds = uploadedPackagesIds
        //   upPkgsIds.push(id)
        //   setUploadedPackagesIds(upPkgsIds)

            
            // Alert.alert(`Pacote n° ${id} está sincronizado com o servidor!`)
            // console.log(`Pac. sincronizado. N° de pacotes: ${uploadedPackagesIds.length}`)
            // console.log(uploadedPackagesIds)
        // }
        // })
    }

}


function closePackages(){
    //...
}


export {synchronizePackages, }