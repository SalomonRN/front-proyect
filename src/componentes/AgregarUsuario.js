import axios from "axios";
import React, { Component } from "react";
import { Navigate } from "react-router-dom";

class AgregarUsuario extends Component{
    
    name = React.createRef();
    apellido = React.createRef();
    correo = React.createRef();
    password = React.createRef();

    state = {
        usuario: {},
        status:null
    }

    changeState = () =>{
        this.setState({
            usuario:{
                name:this.name.current.value,
                surname:this.apellido.current.value,
                email:this.correo.current.value,
                password:this.password.current.value
            }
        })

        console.log(this.state)
    }
    guardarUsuario = (e) =>{
        e.preventDefault();
        console.log(this.name.current.value);
        console.log(this.password.current.value);
        this.changeState();
        console.log(this.state.usuario)
        axios.post("http://localhost:3000/api/guardarUsuario",this.state.usuario)
        .then(res=>{
            this.setState({
                status:"success"
            })
        })
        .catch(function(error){
            console.log(error)
        })
    }
    render(){
        if(this.state.status === "success"){
            return <Navigate to = "/usuarios"/>
        }
        return(
            <React.Fragment>
                <h1>Agregar Usuario</h1>
                <form onSubmit={this.guardarUsuario}>
                    <div className="mb-3">
                        <label for="name" className="form-label">Nombre</label>
                        <input type="text" required className="form-control" id="name" name="name" ref={this.name} onChange={this.changeState} />
                    </div>
                    <div className="mb-3">
                        <label for="apellido" className="form-label"  >Apellido</label>
                        <input type="text" required className="form-control" id="apellido" name="apellido" ref={this.apellido} onChange={this.changeState} />
                    </div>
                    <div className="mb-3">
                        <label for="correo" className="form-label" >Correo</label>
                        <input type="email" required className="form-control" id="correo" aria-describedby="emailHelp" name="correo" ref={this.correo} onChange={this.changeState} />
                    </div>
                    <div className="mb-3">
                        <label for="password" className="form-label" >Contraseña</label>
                        <input type="password" required className="form-control" id="password"  placeholder="password" name="password" ref={this.password} onChange={this.changeState}/>
                    </div>
                    <input type="submit" className="btn btn-primary" />

                </form>
            </React.Fragment>
        );
    }
}

export default AgregarUsuario;