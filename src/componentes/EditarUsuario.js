import axios from "axios";
import React, { Component } from "react";
import swal from "sweetalert";

class EditarUsuario extends Component {

    path = null;
    url = [];
    usuarioId = null;

    name = React.createRef();
    apellido = React.createRef();
    correo = React.createRef();
    password = React.createRef();

    componentWillMount(){
        this.path = window.location.pathname;
        console.log(this.path);
        this.url = this.path.split("/");
        console.log(this.url)
        this.usuarioId = this.url[2];
        console.log(this.usuarioId)
        this.getUsuario(this.usuarioId)
    }

    state = {
        usuario: {},
        status:null
    }


    changeState = () =>{
        this.setState({
            usuario:{
                name:this.nombre.current.value,
                surname:this.apellido.current.value,
                email:this.correo.current.value,
                password:this.password.current.value
            }
        })

        console.log(this.state)
    }
    

    getUsuario = (id) =>{
        axios.get("http://localhost:3000/api/usuario/"+id)
        .then(res => {
            this.setState({
                usuario: res.data.usuario
            })
            console.log(res.data.usuario)
        })
    }


    actualizarUsuario = (e) =>{
        e.preventDefault();
        //console.log(this.name.current.value);
        var usuario = {
            name:this.name.current.value,
            surname:this.apellido.current.value,
            email:this.correo.current.value,
            password:this.password.current.value
        }
        console.log(usuario)
        axios.put("http://localhost:3000/api/actualizar/"+this.usuarioId,usuario)
        .then(res =>{
            this.setState({
                status:"success"
            })
            swal(
                "Usuario actualizado",
                "Usuario actualizado correctamente",
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
                <h1>Editar Usuario</h1>
                <form onSubmit={this.actualizarUsuario}>
                    <div className="mb-3">
                        <label for="nombre" className="form-label">Nombre</label>
                        <input type="text" required className="form-control" id="nombre" name="nombre" ref={this.name}  placeholder={this.state.usuario.name} />
                    </div>
                    <div className="mb-3">
                        <label for="apellido" className="form-label"  >Apellido</label>
                        <input type="text" required className="form-control" id="apellido" name="apellido" ref={this.apellido}  placeholder={this.state.usuario.surname} />
                    </div>
                    <div className="mb-3">
                        <label for="correo" className="form-label" >Correo</label>
                        <input type="email" required className="form-control" id="correo" aria-describedby="emailHelp" name="correo" ref={this.correo}  placeholder={this.state.usuario.email}/>
                    </div>
                    <div className="mb-3">
                        <label for="password" className="form-label" >Contraseña</label>
                        <input type="password" required className="form-control" id="password" name="password" ref={this.password} placeholder={this.state.usuario.password}/>
                    </div>
                    <input type="submit" className="btn btn-primary" />

                </form>
            </React.Fragment>
        );
    }
}

export default EditarUsuario;