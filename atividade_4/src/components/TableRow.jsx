import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Axios from 'axios'

export default class TableRow extends Component{
    constructor(props){
        super(props)
        this.apagar=this.apagar.bind(this)
    }

    apagar(){
        Axios.delete('http://localhost:3001/disciplinas/'+this.props.disciplina.id)
        .then(
            (res)=>{
                console.log('Resgitro apagado')
                this.props.apagarElementoPorId(this.props.disciplina.id)
            }
        )
        .catch((error)=>console.log(error))
    }

    render(){
        const {disciplina}=this.props
        return(
            <tr>
                <td>
                    {disciplina.id}
                </td>
                <td>
                    {disciplina.nome}
                </td>
                <td>
                    {disciplina.curso}
                </td>
                <td>
                    {disciplina.capacidade}
                </td>
                <td style={{textAlign:"center"}}>
                    <Link to={"/edit/"+this.props.disciplina.id} className="btn btn-primary">
                        Editar
                    </Link>
                </td>
                <td style={{textAlign:"center"}}>
                    <button onClick={this.apagar} className="btn btn-danger">
                        Apagar
                    </button>   
                </td>
            </tr>
        )
    }
}