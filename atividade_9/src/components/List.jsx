import React, { Component } from 'react'
import Axios from 'axios'
import TableRow from './TableRow'

import FirebaseContext from '../utils/FirebaseContext'
import FirebaseService from '../services/FirebaseService'

const ListPage = () => (
    <FirebaseContext.Consumer>
        {firebase => <List firebase = {firebase}/>}
    </FirebaseContext.Consumer>
)

export default class List extends Component{

    constructor(props){
        super(props)
        this._isMounted = false

        this.state = {disciplinas: [], loading: false}
        this.apagarElementoPorId = this.apagarElementoPorId.bind(this)
    }

    componentDidMount(){
        this._isMounted = true
        this.setState({loading: true})
        
        FirebaseService.list(this.props.firebase.getFirestore(), (disciplinas) => {
            this._isMounted && this.setState({disciplinas: disciplinas, loading: false})
        })
    }

    componentWillUnmount(){
        this._isMounted = false
    }

    montarTabela(){
        if(!this.state.disciplinas)return
        if(this.state.loading) return this.loadingSpinner()
        return this.state.disciplinas.map(
            (est, i) => {
                return <TableRow disciplina={est}
                 key={i} 
                 apagarElementoPorId = {this.apagarElementoPorId}
                 firebase={this.props.firebase}/>
            }
        )
    }

    loadingSpinner(){
        return(
            <tr style = {{backgroundColor: '#fff'}}>
                <td colSpan = '6'>
                    <div className = 'text-center'>
                        <div className = "spinner-border ml-auto"
                        role ="status"
                        aria-hidden="true"
                        style={{width: '3rem', height:'3rem'}}>
                        </div><br/>
                        <strong>Loading...</strong>
                    </div>
                </td>
            </tr>
        )
    }

    apagarElementoPorId(id){
        let disciplinasTemp = this.state.disciplinas
        for(let i=0;i<disciplinasTemp.length;i++){
            if(disciplinasTemp[i]._id===id){
                disciplinasTemp.splice(i,1)
            }
        }
        this._isMounted && this.setState({disciplinas:disciplinasTemp})
    }
    render(){
        return(
            <div style = {{ marginTop: 10}}>
                <h3>Listar disciplinas</h3>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                        <tr>
                            <td>
                                <th>
                                    ID
                                </th>
                                <th>
                                    Nome
                                </th>
                                <th>
                                    Curso
                                </th>
                                <th>
                                    Capacidade
                                </th>
                                <th colSpan="2" style={{textAlign:"center"}}>
                                    Ação
                                </th>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.montarTabela()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ListPage