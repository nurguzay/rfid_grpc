const ModbusRTU = require('modbus-serial');
const client = new ModbusRTU();


class ModbusConnector {

    #ModbusClient;
    isConnected = false;

     /** Represents a port connection
     * @constructor
     * @returns Returns the instance.
     */

    constructor() {
        // set the parameters of the modbus client
        client.connectRTUBuffered('COM4', { baudRate: 9600 })
            .then(() => {
                console.log('Modbus client connected');
            })
            .catch((err) => {
                console.error('Modbus client connection error:', err);
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