#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <WiFiClientSecure.h> 
#include <ESP8266HTTPClient.h>
#include <Wire.h>

#include <Arduino.h>
#include <ArduinoJson.h>

String mac_address; // for api salve data base

const char* ssid = "joso_2G7EDC7C";
const char* password = "jsamv2001";
WiFiClient wifiClient;
// gp1016 = 16
String response = "";
String json = "";
int httpCode;
void setup() {  
  Serial.begin(9600); // opens serial port, sets data rate to 9600 bps
  WiFi.begin(ssid, password);     //Connect to your WiFi router
  Serial.println("");
  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  pinMode(16, OUTPUT);
  digitalWrite(16, LOW);

  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());  //IP address assigned to your ESP
  // mudar para mac do Esp8266
  mac_address = "40:22:D8:95:B6:59";
  HTTPClient http;
  DynamicJsonDocument doc(2048);
  doc["mac_address"] = mac_address;
  serializeJson(doc, json);
  Serial.print(json);
  http.begin(wifiClient, "http://192.168.0.10:3000/ligaTomada");
  http.addHeader("Content-Type", "application/json");
  httpCode = http.POST(json);
  response = http.getString();
  http.end();
  Serial.print(httpCode);
  delay(5000);
}

void loop() {

  
 if (WiFi.status() == WL_CONNECTED) {
      
    HTTPClient http;
    DynamicJsonDocument doc(2048);
    json = "";
    doc["mac_address"] = mac_address;
    serializeJson(doc, json);
    http.begin(wifiClient, "http://192.168.0.10:3000/releEsp8266");// get the result (**the error code**)
    // passar o content e o tipo de dado no caso json
    http.addHeader("Content-Type", "application/json");
    httpCode = http.POST(json);
    //Serial.println(httpCode);
    response = http.getString();
    if(response != 0){
      if (response[18] == '1'){
        digitalWrite(16, LOW);
      }
      else{
        digitalWrite(16, HIGH);

      }
    }
    //fechando a conexão
    http.end();
 }

  delay(10000);

}
