import axios from "axios";
import React, { Component } from "react";
import { Navigate } from "react-router-dom";

class AgregarCamioneta extends Component{
    
    name = React.createRef();
    brand = React.createRef();
    year = React.createRef();
    description = React.createRef();
    price = React.createRef();
    status = React.createRef();
    image = React.createRef();

    state = {
        camioneta: {},
        status:null
    }

    changeState = () =>{
        this.setState({
            camioneta:{
                name:this.name.current.value,
                brand:this.brand.current.value,
                year:this.year.current.value,
                description:this.description.current.value,
                price:this.price.current.value,
                status:this.status.current.value,
                image:this.image.current.value
            }
        })

        console.log(this.state)
    }
    guardarCamioneta = (e) =>{
        e.preventDefault();
        this.changeState();
        axios.post("http://localhost:3000/api/guardarCamioneta",this.state.camioneta)
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
        if(this.state.status === "S"){
            return <Navigate to = "/"/>
        }
        return(
            <React.Fragment>
                <h1>Agregar Camioneta</h1>
                <form onSubmit={this.guardarCamioneta}>
                    <div className="mb-3">
                        <label for="name" className="form-label">Nombre</label>
                        <input type="text" required className="form-control" id="name" name="name" ref={this.name} onChange={this.changeState} />
                    </div>
                    <div className="mb-3">
                        <label for="brand" className="form-label">Gama</label>
                        <input type="text" required className="form-control" id="brand" name="brand" ref={this.brand} onChange={this.changeState} />
                    </div>
                    <div className="mb-3">
                        <label for="year" className="form-label"  >Año</label>
                        <input type="text" required className="form-control" id="year" name="year" ref={this.year} onChange={this.changeState} />
                    </div>
                    <div className="mb-3">
                        <label for="description" className="form-label"  >Descripcion</label>
                        <input type="text" required className="form-control" id="description" name="description" ref={this.description} onChange={this.changeState} />
                    </div>
                    <div className="mb-3">
                        <label for="price" className="form-label"  >Precio</label>
                        <input type="text" required className="form-control" id="price" name="price" ref={this.price} onChange={this.changeState} />
                    </div>
                    <div className="mb-3">
                        <label for="status" className="form-label" >Estado</label>
                        <input type="text" required className="form-control" id="status" aria-describedby="emailHelp" name="status" ref={this.status} onChange={this.changeState} />
                    </div>
                    <div className="mb-3">
                        <label for="img" className="form-label" >ImagenUrl</label>
                        <input type="text" required className="form-control" id="img" aria-describedby="emailHelp" name="img" ref={this.image} onChange={this.changeState} />
                    </div>

                    <input type="submit" className="btn btn-primary" />

                </form>
            </React.Fragment>
        );
    }
}

export default AgregarCamioneta;