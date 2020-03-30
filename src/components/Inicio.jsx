import React, { Component } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import firebase from 'firebase';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import { userInfo } from "os";

class Inicio extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      nome: 'Nome da rota',
      descricao: '',
      horario: '',
      motorista: '',
	  id: '',
      lista: []
    }
	
  this.BuscarRota = this.BuscarRota.bind(this);
  }
  
  BuscarRota(e){
	let filtro = this.state.nome;
	  
    firebase.database().ref('rota').orderByChild('nome').equalTo(filtro).on('value', snapshot => {
      let state = this.state;
      state.lista = [];

      snapshot.forEach((child) => {
        state.lista.push({
          nome: child.val().nome,
          descricao: child.val().descricao,
          horario: child.val().horario,
		  id: child.key,
        })
      });
      this.setState(state);
    });
  }
  

	Inscrever = (id) => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				let uid = user.uid
        firebase.database().ref('rota').child(id).child('passageiros').child('inscritos').push(uid);
        alert("inscrito")
			}
		});
	}
  
  
  componentDidMount() {
    document.body.classList.toggle("register-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("register-page");
  }


  render() {
    return (
        <>
                    <Col>
                      <Card className="card-register">
                        <CardBody>
                          <Form className="form" >
                            <InputGroup className={classnames({
                                  "input-group-focus": this.state.fullNameFocus
                                })}>
                              
                              <Input
                                  placeholder="Por qual rota você está procurando?"
                                  type="text"
                                  onChange={(e) => this.setState({nome:e.target.value})}
                              />
							  <Button className="btn" color="primary" size="md" onClick={this.BuscarRota}>
                              Buscar
                            </Button>
                            </InputGroup>
                            <br/><br/>
                          </Form>
                          {this.state.lista.map((child) => {
                            return(
                              <div>
                                Nome: {child.nome} <br/>
                                Horário: {child.horario} <br/>
                                Descrição: {child.descricao} <br/>
								<Button class="btn" size="sm" color="success"
								onClick={() => this.Inscrever(child.id)}
								>Inscrever-se</Button>
                              </div>
                            )
                          })}
                        </CardBody>
                        
                      </Card>
                    </Col>
        </>
    );
  }
}
export default Inicio;