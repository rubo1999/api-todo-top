require("dotenv").config();

const {tareas} = require("./db");

const express = require("express");
const {json} = require("body-parser");
const servidor = express();

servidor.use(json())

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

servidor.post("/tareas/nueva", (peticion,respuesta) => {
    console.log(peticion.body);
    respuesta.send("hola");

})

servidor.use((peticion,respuesta) => {
    respuesta.status(404);
    respuesta.json({error : "recurso no encontrado"});
})

servidor.use((error,peticion,respuesta,siguiente) => {
    console.log(error);
    respuesta.status(400);
    respuesta.json({error:"error en la petición"});
})



servidor.listen(process.env.PORT);