import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";


class Camionetas extends Component {
    state = {
        camionetas: []
    }

    componentWillMount() {
        this.getCamionetas();
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
    
    borrarCamioneta = (id) =>{
        swal("Desea borrar la camioneta?", {
            buttons: {
              catch: {
                text: "Confirmar",
                value: "true",
              },
              cancel: "Cancelar"
            },
          })
          .then((value) => {
            switch (value) {
                case "true":
                    axios.delete("http://localhost:3000/api/eliminarCamioneta/"+id)
                    .then(res=>{
                        this.setState({
                            status:"deleted"
                        });
                        swal("Camioneta eliminada");
                    })
            }
          }).then(this.reload)
    }
    render() {

        return (
            <React.Fragment>
                <h1>Camionetas</h1>
                <Link to="/agregarCamioneta" className="btn btn-dark">Agregar Camioneta</Link>
                <table className="table">
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Nombre</td>
                            <td>Gama</td>
                            <td>Año</td>
                            <td>Descripcion</td>
                            <td>Precio</td>
                            <td>Estado</td>
                            <td>Imgaen</td>
                            <td>Acciones</td>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.camionetas.map((camionetas) => {
                                return (
                                    <React.Fragment>
                                        <tr>
                                            <td>{camionetas._id}</td>
                                            <td>{camionetas.name}</td>
                                            <td>{camionetas.brand}</td>
                                            <td>{camionetas.year}</td>
                                            <td>{camionetas.description}</td>
                                            <td>{camionetas.price}</td>
                                            <td>{camionetas.status}</td>
                                            <td><img src={camionetas.image} width="200px" height="125px"></img></td>

                                            <td>
                                                <Link to={"/editarCamioneta/"+camionetas._id} className="btn btn-success">Editar</Link>
                                                <button className="btn btn-danger ms-3" onClick={
                                                    () =>{
                                                        this.borrarCamioneta(camionetas._id)
                                                    }
                                                }>Eliminar</button >
                                                
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                )
                            })
                        }
                        
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}

export default Camionetas;