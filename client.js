const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
var PROTO_PATH = `${__dirname}/rfid.proto`;
const config = require("./config.json");


var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
      // Perhaps this should be false?
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    });

// Package name is appended here
const rfidProto = grpc.loadPackageDefinition(packageDefinition).rfidgrpc;


// Create the gRPC client
const client = new rfidProto.RFIDService('localhost:5000', grpc.credentials.createInsecure());

const count = config.count;
const input_address = config.input_reg_address;

// Call the ReadRFID method
//call fonksiyonunun key parametresi keyParam olarak tanımlandı
client.ReadRFID({input_address: input_address, count: count}, function(err, data) {
    if (err) {
      console.error("HATA--- ", err);
    } else {
        console.log( "VALUE: ", data.tag);
    }
  });

/*
In this client code, we load the same protobuf file that we used for the server. 
We then create a gRPC client for the RFIDService service and call the readRFID method on the client.

The readRFID method takes an empty request message and a callback function. 
When the method completes, the callback function is called with the response message, which contains the RFID tag data.
*/