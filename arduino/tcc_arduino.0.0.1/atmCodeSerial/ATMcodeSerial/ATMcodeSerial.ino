int volt = 0; // for incoming serial data
int amp = 0; // for incoming serial data

void setup() {
  Serial.begin(9600); // opens serial port, sets data rate to 9600 bps
}

void loop() {
  // send data only when you receive data:
    // read the incoming byte:
    delay(3600);

    Serial.write(volt);
    Serial.write(amp);
    volt += 10;
    amp += 12;

    delay(50000);

}
