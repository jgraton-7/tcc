/*
 * Hello world web server
 * circuits4you.com
 */
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>

#include <WiFiClientSecure.h> 
#include <ESP8266HTTPClient.h>
#include <Wire.h>

const char MAIN_page[] PROGMEM = R"=====(
<HTML>
	<HEAD>
			<TITLE>My first web page</TITLE>
	</HEAD>
<BODY>
	<CENTER>
			<B>Hello World.... </B>
	</CENTER>	
</BODY>
</HTML>
)=====";

//SSID and Password of your WiFi router
const char* ssid = "joso_2G7EDC7C";
const char* password = "jsamv2001";
WiFiClient wifiClient;

ESP8266WebServer server(80); //Server on port 80

//===============================================================
// This routine is executed when you open its IP in browser
//===============================================================
void handleRoot() {
 String s = MAIN_page; //Read HTML contents
 server.send(200, "text/html", s); //Send web page
}
//==============================================================
//                  SETUP
//==============================================================
void setup(void){
  Serial.begin(9600);
  
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
 
  //server.on("/", handleRoot);      //Which routine to handle at root location

  server.begin();                  //Start server
  Serial.println("HTTP server started");
}
//==============================================================
//                     LOOP
//==============================================================
void loop() {


  //shids -> ESP -> api
  String response = "";
  String errorMessage = "";
  //server.handleClient();          //Handle client requests
  // Verifica se o esp está conectado
  if (WiFi.status() == WL_CONNECTED) {  
     
    //cria a requisição http passando o URL da api node
    HTTPClient http;
    http.begin(wifiClient, "http://192.168.0.10:3000/TesteESP");// get the result (**the error code**) 
    int httpCode = http.GET();
    response = http.getString();
    Serial.print(response);              
    Serial.print(httpCode);        
    //fechando a conexão
    http.end();
  }
  delay(36000);
}

