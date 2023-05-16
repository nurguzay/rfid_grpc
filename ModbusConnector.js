const ModbusRTU = require('modbus-serial');
const client = new ModbusRTU();

/*
client.connectRTU("/dev/ttyUSB0", { baudRate: 9600 }, () => {
    // Write the value 123 to holding register 1
    client.writeRegister(1, 123, (err) => {
      if (err) {
        console.log('Error writing to modbus device:', err);
      } else {
        console.log('Successfully wrote value to modbus device');
      }
      // Close the connection to the modbus device
      client.close();
    });
  });
*/

class ModbusConnector {

    #ModbusClient;
    isConnected = false;

     /** Represents a port connection
     * @constructor
     * @returns Returns the instance.
     */

     
    constructor() {

        const port = "COM4";
        const baudRate = 9600;
        const address = 1;
        const slaveId = 1;
        // set the parameters of the modbus client
        client.connectRTUBuffered(port, { baudRate })
            .then(() => {
                console.log('Modbus client connected');
                // Configure the slave ID
                client.setID(slaveId);
                
            })
            .catch((err) => {
                console.error('Modbus client connection error:', err);
            });
        
        /*
        // Open the serial port
        client.open(function (err) {
            if (err) {
                console.log(err);
            } else {
                // Write data to the device
                client.writeCoil(address, true, function (err, data) {
                    if (err) {
                        console.log("Error writing to modbus device:", err);
                    } else {
                        console.log("Data written to modbus device:", data);
                    }
  
                    // Close the serial port
                    client.close(function () {});
                });
            }
        });
        */
    }


    async setData() {
        client.writeRegister(1, 123, (err) => {
            if (err) {
              console.log('Error writing to modbus device:', err);
            } else {
              console.log('Successfully wrote value to modbus device');
            }
            // Close the connection to the modbus device
            client.close();
          });
    }


    async getData() {
        await client.readHoldingRegisters(0, 10, (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            return data;
        });
    }

}












/*
// set the parameters of the modbus client
client.connectRTUBuffered('COM4', { baudRate: 9600 })
    .then(() => {
        console.log('Modbus client connected');

        
        // read 10 registers starting from address 0
        client.readHoldingRegisters(0, 10, (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(data);
        });
        
    })
    .catch((err) => {
        console.error('Modbus client connection error:', err);
    });

*/

exports.ModbusConnector = ModbusConnector;