import React, {Component} from 'react'
import FirebaseContext from '../utils/FirebaseContext'
import FirebaseService from '../services/FirebaseService'

const CreatePage = () => (
    <FirebaseContext.Consumer>
        {firebase => <Create firebase ={firebase} />}
    </FirebaseContext.Consumer>
)

export default class Create extends Component{

    constructor(props){
        super(props)
  
        this.state = {nome: '', curso: '', capacidade: ''}

        this.setNome = this.setNome.bind(this)
        this.setCurso = this.setCurso.bind(this)
        this.setCapacidade = this.setCapacidade.bind(this)
        this.onSubimit = this.onSubimit.bind(this)
      }
      setNome(e){
        this.setState({nome: e.target.value})
      }
      setCurso(e){
        this.setState({curso: e.target.value})
      }
      setCapacidade(e){
        this.setState({capacidade: e.target.value})
      }
      onSubimit(e){
          e.preventDefault()

          const novaDisciplina = {nome:this.state.nome, curso:this.state.curso, capacidade:this.state.capacidade}
          
          FirebaseService.create(this.props.firebase.getFirestore(),
          (mensagem) => {
              console.log(mensagem)
          }, novaDisciplina)
          this.setState({nome:'',curso:'',capacidade:''})
      }
    render(){
        return(
            <div style={{marginTop: 10}}>
                <h2>Cadastrar Disciplina</h2>
                <form onSubmit={this.onSubimit}>
                    <div className="form-group">
                        <label>Nome: </label>
                        <input type="text" className="form-control" value={this.state.nome} onChange={this.setNome}/>
                    </div>
                    <div className="form-group">
                        <label>Curso: </label>
                        <input type="text" className="form-control" value={this.state.curso} onChange={this.setCurso}/>
                    </div>
                    <div className="form-group">
                        <label>Capacidade: </label>
                        <input type="text" className="form-control" value={this.state.capacidade} onChange={this.setCapacidade}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Cadastrar" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}