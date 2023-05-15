"use strict";
const SerialPort = require('serialport').SerialPort;
const {ReadlineParser} = require('@serialport/parser-readline');
const json = require("protobufjs");
const path = require('path');
class RFIDConnector {

    #RFIDClient;
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

    /*
    async set(key, value) {
        await this.#RFIDClient.set(key, value);
        console.log("SET Key: " + key + " Value: " + value)
        
    }
    async get(key) {
        const value = await this.#RFIDClient.get(key);
        console.log("GET Key: " + key + " Value: " + value)
        
    }
    */

    /*
    async getJSONFile(key) {
        const value = await this.#RFIDClient.json.GET(key);
        
        console.log("GET JSON Key: " + key + " Value: " + JSON.stringify(value))

        return JSON.stringify(value);
        
    }
    */

    /** Gets all keys from redis.
     * 
     *  Warning: I have seen some comments on stackoverflow about " KEYS * " comment should not be used in production environment.
     *  Probably using this command on a big db can result significant performance loss. This is just for printing for the prototype anyway.
     *  A better way to handle this request might be keeping a static keys list and when connecter initilzed filling the list only once.
     *  (Currently calls KEYS * every webpage request.)
     * 
     * @return {String[]} Returns a string array containing all the keys.
     
    async getAllKeys() {
        const value = await this.#RFIDClient.keys("*").catch(err => console.log(err))
        console.log("Key list: " + value)
        
        return value       
    }
    */

    /*
    async setJSON(device, label, buf) {
        //TODO: duzgun check eklenecek, data varsa ikinci fonksiyon calismayacak
        //Trick: catche duserse entry yok demek, error yerine yeni root entry gonderiyoruz
        //TODO: Determine target db table like "Device"

        const result = await this.#RFIDClient.json.SET("ModbusDevices", "$." + device + "." + label, buf).catch(async (err) => {
            var json = '{"' + device + '":{"' + label + '":' + buf + '}}'
            
            var jsonFile
            try {
                jsonFile = JSON.parse(json)
            } catch (error) {
                jsonFile = { "data": json }
                jsonFile = JSON.parse(jsonFile)
                console.log("Value is not a json: " + json + error)
            }
            const result = await this.#RFIDClient.json.SET("ModbusDevices", "$", jsonFile).catch((err) => { console.log(" Error Set JSON. Redis.JSON.SET " + json); console.log(err) })
        })
        
    }
    */

    /** Gets all values in the database. Then puts them in a json format.
     * @return {object} Returns a JSON containing <key, value> pairs.
     * 
    
        async getAllEntries() {
            console.log("Get all entries invoked")
            var keyList = await this.getAllKeys();
            //Get values from Redis using MGET. MGET allows retriving muliple items at once.
    
            var value = await this.#RFIDClient.json.mGet(keyList, "$").catch(err => console.log(err))
    
            var valueJson = {}
    
            for (let i = 0; i < keyList.length; i++) {
              const key = keyList[i];
              const val = value[i];
        
                   valueJson[key] = val
            }
    
            JSON.stringify(valueJson)
            console.log(valueJson);
            return valueJson;
        }
    */

    /** sends data to redis server in json for. ONLY SERVES DEVICES FOR NOW
     * @param  {int} device
     * @param  {String} label label for red value
     * @param  {val} buf keep the fetch result
    
    async setJSON(device, label, buf) {
        //TODO: duzgun check eklenecek, data varsa ikinci fonksiyon calismayacak
        //Trick: catche duserse entry yok demek, error yerine yeni root entry gonderiyoruz
        //TODO: Determine target db table like "Device"

        const result = await this.#RFIDClient.json.SET("ModbusDevices", "$." + device + "." + label, buf).catch(async (err) => {
            var json = '{"' + device + '":{"' + label + '":' + buf + '}}'
            
            var jsonFile
            try {
                jsonFile = JSON.parse(json)
            } catch (error) {
                jsonFile = { "data": json }
                jsonFile = JSON.parse(jsonFile)
                console.log("Value is not a json: " + json + error)
            }
            const result = await this.#RFIDClient.json.SET("ModbusDevices", "$", jsonFile).catch((err) => { console.log(" Error Set JSON. Redis.JSON.SET " + json); console.log(err) })
        })
        
    }
    */
    
    /** This function used to be a generalized function, it is now specialized for modbus
     * @param  {} device
     * @param  {} value
     
    async setJSONRoot(device, value, topLevel) {
        console.log("DEĞER-------- " + value)
        
        //this is a hack, when the statement fails it uses the alternative, which sets a new root
        //this way, we can ensure there is a root to append to without the need of fetching existing contents
        //topLevel is the top level you choose, for example ModbusDevices

        
        const result = await this.#RFIDClient.json.SET(topLevel, "." + device, value).catch(async (err) => {
            var json = {}
            json[device] = value
            console.log("JSON DEĞERİ: "+ json)
            const result = await this.#RFIDClient.json.SET(topLevel, ".", json).catch((err) => { console.log(" Error Set JSON. Redis.JSON.SET " + json, "SOMETHING MIGHT BE WRONG WITH CONNECTION OR REDIS STRUCTURE"); console.log(err) })
            
        })
    
    }

    */
    

}
exports.RFIDConnector = RFIDConnector;