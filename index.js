require("dotenv").config();
const {tareas} = require("./db");

const express = require("express");

const servidor = express();



if(process.env.LOCAL){
    servidor.use(express.static("./pruebas"))
}

servidor.get("/tareas", async (peticion,respuesta) => {
    try{
        let resultado = await tareas();

        respuesta.json(resultado);
    }catch(error){
        respuesta.status(500);

        respuesta.json(error);
    }
    

})

servidor.use((peticion,respuesta) => {
    respuesta.status(404);
    respuesta.json({error : "recurso no encontrado"});
})



servidor.listen(process.env.PORT);