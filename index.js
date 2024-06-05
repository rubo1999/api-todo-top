require("dotenv").config();

const express = require("express");
const {json} = require("body-parser");
const postgres = require("postgres");
const servidor = express();

servidor.use(json());

if(process.env.LOCAL){
    servidor.use(express.static("./pruebas"))
}






servidor.listen(process.env.PORT);