require("dotenv").config();

const {tareas, crearTarea, borrarTarea, toggleEstado,editarTexto} = require("./db");

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

servidor.post("/tareas/nueva", async (peticion,respuesta,siguiente) => {
    if(!peticion.body.tarea || peticion.body.tarea.trim() == "" ){
        return siguiente(true);
    }
    try{

        let id = await  crearTarea(peticion.body.tarea);

        respuesta.json({id});

    }catch(error){
        respuesta.status(500);

        respuesta.json(error);
    }
})

servidor.delete("/tareas/borrar/:id([0-9]+)", async (peticion,respuesta) => {
    try{
        let count = await borrarTarea(peticion.params.id);

        respuesta.json({resultado : count ? "ok" : "ko"});
    }catch(error){
        respuesta.status(500);

        respuesta.json(error);
    }
})

servidor.use((peticion,respuesta) => {
    respuesta.status(404);
    respuesta.json({error : "recurso no encontrado"});
})

servidor.use((error,peticion,respuesta,siguiente) => {
    respuesta.status(400);
    respuesta.json({error:"error en la petición"});
})



servidor.listen(process.env.PORT);