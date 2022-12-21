import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


class Alquilar extends Component {
    state = {
        camionetas: []
    }

    componentWillMount() {
        this.getCamionetas();
    };

    comprobar = () =>{
        if(this.state.camionetas.status == "Sin Alquilar"){
            console.log("ENTRA AL IF")
            console.log(this.state.camionetas.status)
        }else{
            console.log("ENTRA AL ELSE")
            console.log(this.state.camionetas.status)
            
        }
    }

    getCamionetas = () => {
        axios.get("http://localhost:3000/api/camionetas")
            .then(res => {
                console.log(res.data.doc);
                this.setState({
                    camionetas: res.data.doc
                });
            })
            .catch(error => {
                console.log(error);
            })
    }
    reload = () => {
        window.location.reload(true);
      }
    
    render() {

        return (
            <React.Fragment>
                <h1>Camionetas</h1>
                <Link to="/agregarCamioneta" className="btn btn-dark">Agregar Camioneta</Link>
                <table className="table">
                    <thead>
                        <tr>
                            <td>Nombre</td>
                            <td>Gama</td>
                            <td>Año</td>
                            <td>Descripcion</td>
                            <td>Estado</td>
                            <td>Imagen</td>
                            <td>Acciones</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.camionetas.map((camionetas) => {
                                if(camionetas.status == "Sin Alquilar"){
                                    return (
                                        <React.Fragment>
                                            <tr>
                                                <td>{camionetas.name}</td>
                                                <td>{camionetas.brand}</td>
                                                <td>{camionetas.year}</td>
                                                <td>{camionetas.description}</td>
                                                <td>{camionetas.status}</td>
                                                <td><img src={camionetas.image} width="250px"></img></td>
                                                <td>
                                                    <button className="btn btn-success ms-3" onClick={console.log()}> Alquilar</button >
                                                    
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    )
                                }else{
                                    return (
                                        <React.Fragment>
                                            <tr>
                                                <td>{camionetas.name}</td>
                                                <td>{camionetas.brand}</td>
                                                <td>{camionetas.year}</td>
                                                <td>{camionetas.description}</td>
                                                <td>{camionetas.status}</td>
                                                <td><img src={camionetas.image} width="250px"></img></td>
                                                <td>
                                                    <label className="btn btn-danger ms-3"> Alquilar</label >
                                                    
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    )
                                }

                            })
                        }
                        
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}

export default Alquilar;