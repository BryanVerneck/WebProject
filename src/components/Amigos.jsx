import React from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import firebase from 'firebase';
import '../Conexao';

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


class Amigos extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      nome: '',
      usuario: '',
      lista: []
    }
	
  this.Listar = this.Listar.bind(this);
  this.seguir = this.seguir.bind(this);
  }
 
  seguir(){
      var user = firebase.auth().currentUser;
      if(user){
        alert("seguindo")
        firebase.database().ref('usuario').child(user.uid).child('seguindo').push().set({
          nome: this.state.nome,
        })
      .then(()=>{
        this.setState({
          
        })
      });
    }
  }

  Listar() {
    firebase.database().ref('usuario').orderByChild('nome').equalTo(this.state.nome).on('value', snapshot => {
        let state = this.state;
        state.lista = [];
        snapshot.forEach((child) => {
          state.lista.push({
            nome: child.val().nome,
			img: child.val().imagem,
            email: child.val().email
          })
        });
        this.setState(state);
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
          <div className="wrapper">
            <div className="page-header">
              <div className="page-header-image" />
              <div className="content">
                <Container>
                  <Row>
                    <Col className="offset-lg-0 offset-md-3" lg="12">
                          <Form className="form" >
							<InputGroup>
							<Input
							  placeholder="Quem você está procurando?" type="text"
							  onChange={(e) => this.setState({nome:e.target.value})}
							/>
							<Button className="btn" onClick={this.Listar}>Buscar</Button>
                            </InputGroup>
							<Container>
								{this.state.lista.map((child) => {
									return(
									  <Card className="perfil col-3" >
										<CardBody>
										<img className="perfil_img" src={child.img} />
										<span className="perfil_nome">{child.nome}</span>
										<span className="perfil_nome">{child.email}</span>
										<Button onClick={this.seguir}>Seguir</Button>
										</CardBody>
									  </Card>
									)
								  })}
							</Container>
                          </Form>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
          </div>
        </>
    );
  }
}

export default Amigos;