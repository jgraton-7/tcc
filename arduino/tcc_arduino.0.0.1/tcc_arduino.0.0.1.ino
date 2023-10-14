
#include "EmonLib.h" //INCLUSÃO DE BIBLIOTECA

#define CURRENT_CAL 24.40 //VALOR DE CALIBRAÇÃO (DEVE SER AJUSTADO EM PARALELO COM UM MULTÍMETRO MEDINDO A CORRENTE DA CARGA)
#define VOLT_CAL 53.2 //VALOR DE CALIBRAÇÃO (DEVE SER AJUSTADO EM PARALELO COM UM MULTÍMETRO)
float ruido = 0.16; //RUÍDO PRODUZIDO NA SAÍDA DO SENSOR (DEVE SER AJUSTADO COM A CARGA DESLIGADA APÓS CARREGAMENTO DO CÓDIGO NO ARDUINO)

float consumoMedio = 0;
int timer = 0;
float KWH = 0;

EnergyMonitor emon1; //CRIA UMA INSTÂNCIA
EnergyMonitor emon2; //CRIA UMA INSTÂNCIA
char json[] =
      "{\"sensor\":\"gps\",\"time\":1351824120,\"data\":[48.756080,2.302038]}";


void setup(){  
  Serial.begin(9600); //INICIALIZA A SERIAL
  emon1.current(A2, CURRENT_CAL); //PASSA PARA A FUNÇÃO OS PARÂMETROS (PINO ANALÓGIO / VALOR DE CALIBRAÇÃO)
  emon2.voltage(3, VOLT_CAL, 1.7); //PASSA PARA A FUNÇÃO OS PARÂMETROS (PINO ANALÓGIO / VALOR DE CALIBRAÇÃO / MUDANÇA DE FASE)

}

void loop(){

  emon1.calcVI(17,100); //FUNÇÃO DE CÁLCULO (17 SEMICICLOS / TEMPO LIMITE PARA FAZER A MEDIÇÃO)
  double currentDraw = emon1.Irms; //VARIÁVEL RECEBE O VALOR DE CORRENTE RMS OBTIDO
  currentDraw = currentDraw-ruido; //VARIÁVEL RECEBE O VALOR RESULTANTE DA CORRENTE RMS MENOS O RUÍDO
  
  if(currentDraw < 0){ //SE O VALOR DA VARIÁVEL FOR MENOR QUE 0, FAZ 
      currentDraw = 0; //VARIÁVEL RECEBE 0
  }
  Serial.print("Corrente medida: "); //IMPRIME O TEXTO NA SERIAL
  Serial.print(currentDraw); //IMPRIME NA SERIAL O VALOR DE CORRENTE MEDIDA
  Serial.println("A"); //IMPRIME O TEXTO NA SERIAL

  emon2.calcVI(17,2000); //FUNÇÃO DE CÁLCULO (17 SEMICICLOS, TEMPO LIMITE PARA FAZER A MEDIÇÃO)    
  
  float supplyVoltage   = emon2.Vrms; //VARIÁVEL RECEBE O VALOR DE TENSÃO RMS OBTIDO
 
  Serial.print("Tensão medida na rede AC: "); //IMPRIME O TEXTO NA SERIAL
  Serial.print(supplyVoltage, 0); //IMPRIME NA SERIAL O VALOR DE TENSÃO MEDIDO E REMOVE A PARTE DECIMAL
  Serial.println("V"); //IMPRIME O TEXTO NA SERIAL
  timer += 1;
  consumoMedio += supplyVoltage * currentDraw / 1000;
  if(timer == 3600){
    Serial.println(consumoMedio/60);
    KWH += consumoMedio/60;
    timer = 0;
  }
  delay(1000);



}
