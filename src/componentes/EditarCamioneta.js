import axios from "axios";
import React, { Component } from "react";
import swal from "sweetalert";

class EditarCamioneta extends Component {

    path = null;
    url = [];
    camionetaId = null;

    name = React.createRef();
    brand = React.createRef();
    year = React.createRef();
    description = React.createRef();
    status = React.createRef();

    componentWillMount(){
        this.path = window.location.pathname;
        console.log(this.path);
        this.url = this.path.split("/");
        console.log(this.url)
        this.camionetaId = this.url[2];
        console.log(this.camionetaId)
        this.getcamioneta(this.camionetaId)
    }

    state = {
        camioneta: {},
        status:null
    }


    changeState = () =>{
        this.setState({
            camioneta:{
                name:this.nombre.current.value,
                brand:this.brand.current.value,
                year:this.year.current.value,
                description:this.description.current.value
            }
        })

        console.log(this.state)
    }
    

    getcamioneta = (id) =>{
        axios.get("http://localhost:3000/api/mostrarCamioneta/"+id)
        .then(res => {
            this.setState({
                camioneta: res.data.camioneta
            })
            console.log(res.data.camioneta)
        })
    }


    actualizarcamioneta = (e) =>{
        e.preventDefault();
        //console.log(this.name.current.value);
        var camioneta = {
            name:this.name.current.value,
            surname:this.apellido.current.value,
            email:this.correo.current.value,
            password:this.password.current.value
        }
        console.log(camioneta)
        axios.put("http://localhost:3000/api/actualizarCamioneta/"+this.camionetaId,camioneta)
        .then(res =>{
            this.setState({
                status:"success"
            })
            swal(
                "camioneta actualizado",
                "camioneta actualizado correctamente",
                "success"
                
            ),reload = () => {
                window.location.reload(true);
            }
            
        }).catch(error =>{
            console.log(error);
        })
    }



    render() {
        return (
            <React.Fragment>
                <h1>Editar Camioneta</h1>
                <form onSubmit={this.actualizarcamioneta}>
                <div className="mb-3">
                        <label for="name" className="form-label">Nombre</label>
                        <input type="text" required className="form-control" id="name" name="name" placeholder={this.state.camioneta.name} ref={this.name} onChange={this.changeState} />
                    </div>
                    <div className="mb-3">
                        <label for="brand" className="form-label">Gama</label>
                        <input type="text" required className="form-control" id="brand" name="brand"  placeholder={this.state.camioneta.brand} ref={this.brand} onChange={this.changeState} />
                    </div>
                    <div className="mb-3">
                        <label for="year" className="form-label"  >Año</label>
                        <input type="text" required className="form-control" id="year" name="year" placeholder={this.state.camioneta.year} ref={this.year} onChange={this.changeState} />
                    </div>
                    <div className="mb-3">
                        <label for="description" className="form-label"  >Descripcion</label>
                        <input type="text" required className="form-control" id="description" name="description" placeholder={this.state.camioneta.description} ref={this.description} onChange={this.changeState} />
                    </div>
                    <div className="mb-3">
                        <label for="status" className="form-label" >Estado</label>
                        <input type="text" required className="form-control" id="status" aria-describedby="emailHelp" name="status" placeholder={this.state.camioneta.status} ref={this.status} onChange={this.changeState} />
                    </div>
                    <input type="submit" className="btn btn-primary" />

                </form>
            </React.Fragment>
        );
    }
}

export default EditarCamioneta;