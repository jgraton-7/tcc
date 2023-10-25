#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>

#include <WiFiClientSecure.h> 
#include <ESP8266HTTPClient.h>
#include <Wire.h>
#include <ArduinoJson.h>

String volt; // for incoming serial data
String amp; // for incoming serial data
String serialResult;
String mac_address; // for api salve data base
int val;

const char* ssid = "joso_2G7EDC7C";
const char* password = "jsamv2001";
WiFiClient wifiClient;

ESP8266WebServer server(80); //Server on port 80

void setup() {
  Serial.begin(9600); // opens serial port, sets data rate to 9600 bps
  WiFi.begin(ssid, password);     //Connect to your WiFi router
  Serial.println("");

  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  //If connection successful show IP address in serial monitor
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());  //IP address assigned to your ESP
  mac_address = WiFi.macAddress();
}

void loop() {
  // send data only when you receive data:
  delay(8000);
  String response = "";
  String errorMessage = "";

  if (WiFi.status() == WL_CONNECTED) { 
     if (Serial.available() > 0) {
        int lenAmp = Serial.read();
        if(lenAmp > 0){
          for (int i = 0; i < lenAmp; i++){
              val = Serial.read();
              if(val != -1){
                serialResult += char(val);
              }
          }
        }
        int lenVolt = Serial.read();
        if (lenVolt > 0){
          for (int i = 0; i < lenVolt; i++){
            val = Serial.read();
            if(val != -1){
              serialResult += char(val);
            }
          }
        }
        int index = serialResult.indexOf('\r');
        amp = serialResult.substring(0, index);
        volt = serialResult.substring(index + 1, serialResult.length());
        HTTPClient http;
        DynamicJsonDocument doc(4096);

        doc["amp"]  = amp;
        doc["volt"] = volt;
        doc["mac_address"] = mac_address;
        String json = "";
        serializeJson(doc, json);

        //iniciar com client + http api
        http.begin(wifiClient, "http://192.168.0.10:3000/adicionarMedicaoTomada");// get the result (**the error code**)
        // passar o content e o tipo de dado no caso json
        http.addHeader("Content-Type", "application/json");
        int httpCode = http.POST(json);
        //Serial.println(httpCode);
        response = http.getString();     
        //fechando a conexão
        http.end();
        amp = "";
        volt = "";
        serialResult = "";
     }
     else{
      Serial.println("Serial nao Disponivel ou Não a dados na fila");
     }
  }
  else{
     Serial.println("ESP8266 Não conectado ao ssid revise sua ssid ou senha");
  }
  delay(10000);
}
