"use strict";
const SerialPort = require('serialport').SerialPort;
const {ReadlineParser} = require('@serialport/parser-readline');
const path = require('path');
class portConnector {


    isConnected = false;

        /** Represents a port connection
     * @constructor
     * @returns Returns the instance.
     */


    constructor() {
        // Serial port configuration
        const port =  new SerialPort({path: 'COM4', baudRate: 9600, parser: new ReadlineParser("\n") });
        const cache = [];
        const pathName =  JSON.stringify(path, (key, value) => {
        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
            // Circular reference found, discard key
            return;
            }
            // Store value in our collection
            cache.push(value);
        }
        return value;
        });
        console.log("Bağlanılan: ", pathName);
        const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));
        parser.on('data', console.log)
    }
}
exports.portConnector = portConnector;