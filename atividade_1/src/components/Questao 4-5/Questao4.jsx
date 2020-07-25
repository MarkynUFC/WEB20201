import React, { Component } from 'react'

import Questao3Filho from '../Questao3/Questao3Filho'
import {Card} from 'react-bootstrap'

export class Questao4 extends Component{
    render(){
        return(
            <Card>
                <Card.Body>
                    <Card.Title>
                        Meus dados 
                    </Card.Title>
                    <Card.Text>
                            <Questao3Filho 
                        nome='Marcos Antonio Matias' 
                        curso='Software Engineering' 
                        cidade='Horizonte'/>  
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
}

export default Questao4