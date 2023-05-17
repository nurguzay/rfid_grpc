const { Board, Sensor } = require('johnny-five');

// Define the port for your Arduino Uno
const port = 'COM4';

// Initialize the board
const board = new Board({ port });

board.on('ready', () => {
  // Create a new sensor instance for reading data
  const sensor = new Sensor({
    pin: 'A0', // Specify the analog input pin to read from
    freq: 1000, // Specify the sampling frequency (in milliseconds)
  });

  // Event handler for reading data from the sensor
  sensor.on('change', () => {
    const sensorValue = sensor.value; // Read the sensor value
    const uint16Value = sensorValue & 0xFFFF; // Extract the lower 16 bits (uint16_t)
    console.log('Sensor value (uint16_t):', uint16Value);
  });
});
