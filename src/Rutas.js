import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AgregarUsuario from "./componentes/AgregarUsuario";
import Usuarios from "./componentes/Usuarios";
import Menu from "./componentes/Menu";
import EditarUsuario from "./componentes/EditarUsuario";
import Camionetas from "./componentes/Camionetas";
import AgregarCamioneta from "./componentes/AgregarCamioneta";
import EditarCamioneta from "./componentes/EditarCamioneta";
import Alquilar from "./componentes/Alquilar";

class Rutas extends Component{
    render(){
        return(
            <BrowserRouter>
                <Menu />
                <Routes>
                    <Route path="/" element={<div>HOME</div>} />
                    <Route path="/usuarios" element={<Usuarios />} />
                    <Route path="/agregarUsuario" element={<AgregarUsuario />} />
                    <Route path="/editarUsuario/:id" element={<EditarUsuario />} />
                    <Route path="/camionetas/" element={<Camionetas />} />
                    <Route path="/agregarCamioneta/" element={<AgregarCamioneta />} />
                    <Route path="/editarCamioneta/:id" element={<EditarCamioneta />} />
                    <Route path="/alquilar/" element={<Alquilar />} />
                </Routes>
            </BrowserRouter>
        );
    }
}

export default Rutas;