#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>

#include <WiFiClientSecure.h> 
#include <ESP8266HTTPClient.h>
#include <Wire.h>
#include <ArduinoJson.h>

double volt = 0; // for incoming serial data
double amp = 0; // for incoming serial data
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
  Serial.print("ESP Board MAC Address:  ");
  Serial.println(WiFi.macAddress()); // imprimir mac address 
}

void loop() {
  // send data only when you receive data:

  String response = "";
  String errorMessage = "";

  if (WiFi.status() == WL_CONNECTED) { 
     if (Serial.available() > 0) {
        // read the incoming byte:
        volt = Serial.read();
        amp = Serial.read();
        //volt = 122;
        //amp =  8.02;
        DynamicJsonDocument doc(2048);

        doc["amp"]  = amp;
        doc["volt"] = volt;

        String json = "";
        serializeJson(doc, json);
        Serial.print(json);
        HTTPClient http;
        //iniciar com client + http api
        http.begin(wifiClient, "http://192.168.0.10:3000/TesteESP");// get the result (**the error code**)
        // passar o content e o tipo de dado no caso json
        http.addHeader("Content-Type", "application/json");
        int httpCode = http.POST(json);
        Serial.println(httpCode);
        response = http.getString();     
        //fechando a conexão
        http.end();
     }
     else{
      Serial.print("Serial nao Disponivel");
     }
  }
  else{
     Serial.print("ESP8266 Não conectado ao client");
  }
  delay(50000);
}
