const ModbusRTU = require('modbus-serial');
//const config = require("./config.json");

class ModbusConnector {
  constructor(port, baudRate) {
    this.client = new ModbusRTU();
    this.port = port;
    this.baudRate = baudRate;
    this.connected = false;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.client.connectRTUBuffered(this.port, { baudRate: this.baudRate })
        .then(() => {
          this.connected = true;
          resolve();
          console.log("Modbus connected...");
        })
        .catch((err) => {
          this.connected = false;
          reject(err);
        });
    });
  }

  disconnect() {
    return new Promise((resolve, reject) => {
      this.client.close((err) => {
        if (err) {
          reject(err);
        } else {
          this.connected = false;
          resolve();
        }
      });
    });
  }

  readInputRegisters(input_address, count) {
    return new Promise((resolve, reject) => {
      if (!this.connected) {
        reject(new Error('Modbus connection not established'));
        return;
      }

      this.client.readHoldingRegisters(input_address, count)
        .then((data) => {
          resolve(data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  writeSingleRegister(holding_address, value) {
    return new Promise((resolve, reject) => {
      if (!this.connected) {
        reject(new Error('Modbus connection not established'));
        return;
      }

      this.client.writeSingleRegister(holding_address, value)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
exports.ModbusConnector = ModbusConnector;
