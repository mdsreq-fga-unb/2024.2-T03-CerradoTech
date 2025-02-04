
Build: 
> ionic build --prod --release
> npx cap copy
> npx cap sync
> npx cap open android


cd android
> .\gradlew bundle

Dev:
-> Copiar aquivo localizado em: radisCerrado\android\app\build\outputs\bundle\debug
    para a pasta contendo bundletool
-> Deletar os arquivos antigos e
        Executar o comando:
        dev:
        java -jar "bundletool-all-1.6.1.jar" build-apks --bundle="app-debug.aab" --output="radisCerrado.apks" --mode="universal"

        prod:
        java -jar "bundletool-all-1.6.1.jar" build-apks --bundle="app-release.aab" --output="radisCerrado.apks" --mode="universal"
-> Renomeie o arquivo appLua.apks para a extensão .zip e extraia a pasta





Gerar chave e assinar:

keytool -genkey -v -keystore ipcanastra.keystore -alias ipcanastra -keyalg RSA -keysize 2048 -validity 10000

Navegar para pasta: radisCerrado\android\app\build\outputs\bundle\release
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore radisCerrado.keystore app-release.aab radisCerrado
(chave precisa estar no mesmo diretório)
Depois usar bundletool para testar aab

java -jar "bundletool-all-1.4.0.jar" build-apks --bundle="app-release.aab" --output="radisCerrado.apks" --ks="radisCerrado.keystore" --ks-pass=pass:@radisCerrado@ --ks-key-alias=radisCerrado --key-pass=pass:@radisCerrado@
java -jar "bundletool-all-1.4.0.jar" install-apks --apks=radisCerrado.apks



