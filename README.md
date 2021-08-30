# test-ReactNative: My GPS - Tracking 🌐️

Home screen        |  Status screen
:-------------------------:|:-------------------------:
<img src="https://user-images.githubusercontent.com/52416026/131277664-05e33029-f18b-4db3-b53d-ea1f58878c1e.jpg" width="50%">  |  <img src="https://user-images.githubusercontent.com/52416026/131277895-7cef8fd5-07ea-40e6-9fba-b84fe27c41e8.jpg" width="50%">




Aplicativo móvel criado para o teste React Native da empresa **[Contele](https://contele.com.br/)**. O aplicativo basicamente permite o monitoramento
da localização do usuário e o envio da mesma para um servidor. O código do servidor está disponível neste Repositório: [github.com/contele/cntl-test/tree/master/react-native](https://github.com/contele/cntl-test/tree/master/react-native). O aplicativo monitora as informações do gps (em um intervalo de tempo determinado pelo usuário) e as salva localmente. Se o usuário estiver conectado a internet, os pacotes locais serão automaticamente sincronizados com os do servidor (desde de que o servidor esteja em devido funcionamento).

## Principais features 🚀️
- Geolocalização
- Sincronização (online/offline)
- Android/iOS

## Principais tecnologias utilizadas 💻
- React Native
- TypeScript
- useContext
- AsyncStorage
- Expo location
- NetInfo
- Axios

## Executando projeto ▶

Para executar este projeto, você precisa ter instalado em sua máquina:
- Yarn ou NPM
- Expo

Para executar o projeto, clone este repositório, executando na linha de comando:
```shell
$ git clone https://github.com/Racklyn/test-ReactNative
```
No diretório do projeto, instale as dependências necessárias com algum dos comandos a seguir (a depender do instalador de pacotes que você preferir):
```shell
$ yarn install
```
ou
```shell
$ npm install
```
Inicie o projeto:
```shell
$ expo start
```

Abrindo no endereço [http://localhost:8081/](http://localhost:8081/) no navegador, você encontrará opções para executar o aplicativo em seu smartphone, 
em algum emulador ou na web.

Note que para a aplicação funcionar corretamente, é necessário que o servidor já citado esteja rodando em sua máquina na porta **[8081](http://localhost:8081/)**.
Para pôr o servidor em execução, siga as instruções disponíveis no [respositório da Contele](https://contele.com.br/) deste teste React Native

## Construindo projeto 🛠
A aplicação pode ser colocada em produção com o comando:
```shell
$ yarn build
```

## Sobre 📋

Desenvolvido por **Francisco Racklyn Sotero dos Santos**.
[Acessar linkedin](https://www.linkedin.com/in/racklyn-sotero-6567561b5/)

