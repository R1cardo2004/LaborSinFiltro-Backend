
const mongoose = require('mongoose')
const debug = require('debug')('app:databse')

const dbhost = process.env.DBHOST;
const dbport = process.env.DBPORT;
const dbname = process.env.DBNAME;

const dburi = process.env.DBURI;

const conexion = async () => {
    try{
        await mongoose.connect(dburi)
        debug("connection to database established")
    }catch(error){
        console.log(error);
        debug("cannot connect to database")
        process.exit(1);
    }
}

const desconnectDB = async () =>{
    try{
        mongoose.disconnect(dburi)
        debug("connection to database ended")
    }catch(error){
        process.exit(1)
    }
}

module.exports ={
    conexion,
    desconnectDB
}