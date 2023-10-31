#include <ZMPT101B.h>


void setup() {
  Serial.begin(115200);
}

void loop() {
  Serial.println(analogRead(A3));
  delayMicroseconds(1000);
  delay(500);
}