const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
var PROTO_PATH = `${__dirname}/rfid.proto`;
const {ModbusConnector} = require("./ModbusConnector.js");
const config = require("./config.json")
const port = config.port;
const baudRate = config.baudRate;

var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    });

// Package name is appended here
const rfidProto = grpc.loadPackageDefinition(packageDefinition).rfidgrpc;
const conn = new ModbusConnector(port, baudRate);
conn.connect();


// Implement method
// Not camelCased here
async function readRFID(call, callback) {
  try {
    // Assuming you have a modbus connection object named `conn`
    //const tag = await conn.readInputRegisters(call.request.input_address, call.request.count);
    const tag = "value"
    callback(null, { tag });
  } catch (error) {
    callback(error);
  }
}


function main() {
    var server = new grpc.Server();
    server.addService(rfidProto.RFIDService.service, { ReadRFID: readRFID });

    server.bindAsync(
        "127.0.0.1:5000",
        grpc.ServerCredentials.createInsecure(), (err) => {
            server.start();
            console.log("GRPC Server 5000 üzerinde başlatıldı.....");
        }
    );
 }
main();

/*
We load the protobuf file and create a gRPC server. We then implement the readRFID method, 
which reads the data from the RFID reader and sends it back to the client as a response.

We then add the readRFID method to the server and start the server on port 50051.
*/