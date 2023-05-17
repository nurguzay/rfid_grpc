const SerialPort = require('serialport');

const port = new SerialPort('COM4', { baudRate: 9600 });

// Read data from Arduino
port.on('data', (data) => {
  // Process the received data
  const sensorValue = parseInt(data.toString(), 10);

  // Perform actions based on the sensor value
  console.log(`Received sensor value: ${sensorValue}`);

  // Send commands or data to the Arduino if needed
  // For example, you can write data back to the Arduino
  // port.write('SomeCommand');
});

// Write data to Arduino
// port.write('SomeCommand');

// Handle errors
port.on('error', (err) => {
  console.error('Serial port error:', err);
});
