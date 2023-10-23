
#include "EmonLib.h" //INCLUSÃO DE BIBLIOTECA

#define CURRENT_CAL 24.40 //VALOR DE CALIBRAÇÃO (DEVE SER AJUSTADO EM PARALELO COM UM MULTÍMETRO MEDINDO A CORRENTE DA CARGA)
#define VOLT_CAL 444.7 //VALOR DE CALIBRAÇÃO (DEVE SER AJUSTADO EM PARALELO COM UM MULTÍMETRO)
float ruido = 0.14; //RUÍDO PRODUZIDO NA SAÍDA DO SENSOR (DEVE SER AJUSTADO COM A CARGA DESLIGADA APÓS CARREGAMENTO DO CÓDIGO NO ARDUINO)

float consumoMedio = 0;
int timer = 0;

EnergyMonitor emon1; //CRIA UMA INSTÂNCIA
EnergyMonitor emon2; //CRIA UMA INSTÂNCIA

float supplyVoltage = 0;
double currentDraw = 0;

void setup(){  
  Serial.begin(9600); //INICIALIZA A SERIAL
  emon1.current(A2, CURRENT_CAL); //PASSA PARA A FUNÇÃO OS PARÂMETROS (PINO ANALÓGIO / VALOR DE CALIBRAÇÃO)
  emon2.voltage(3, VOLT_CAL, 1.7); //PASSA PARA A FUNÇÃO OS PARÂMETROS (PINO ANALÓGIO / VALOR DE CALIBRAÇÃO / MUDANÇA DE FASE)

}

void loop(){

  emon1.calcVI(17,100); //FUNÇÃO DE CÁLCULO (17 SEMICICLOS / TEMPO LIMITE PARA FAZER A MEDIÇÃO)
  double currentDrawTmp = emon1.Irms; //VARIÁVEL RECEBE O VALOR DE CORRENTE RMS OBTIDO
  currentDrawTmp = currentDrawTmp - ruido; //VARIÁVEL RECEBE O VALOR RESULTANTE DA CORRENTE RMS MENOS O RUÍDO
  
  if(currentDrawTmp < 0){ //SE O VALOR DA VARIÁVEL FOR MENOR QUE 0, FAZ 
      currentDraw += 0; //VARIÁVEL RECEBE 0
  }
  else{
    currentDraw += currentDrawTmp; 
  }

  emon2.calcVI(17,2000); //FUNÇÃO DE CÁLCULO (17 SEMICICLOS, TEMPO LIMITE PARA FAZER A MEDIÇÃO)    
  supplyVoltage  += emon2.Vrms; //VARIÁVEL RECEBE O VALOR DE TENSÃO RMS OBTIDO
 
  timer += 1;
  if(timer == 60){
    int amp = int((currentDraw / 60) * 100);
    int volt = int(supplyVoltage / 60);
    Serial.write(amp);
    Serial.write(volt);
    timer = 0;
    currentDraw = 0;
    supplyVoltage = 0;
  }

  delay(1000);



}
