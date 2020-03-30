/*!
=========================================================
* BLK Design System React - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/master/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React from "react";
import { Link } from "react-router-dom";
import firebase from '../Conexao';
import classnames from "classnames";

import Inicio from "../components/Inicio";
import Feed from "../components/Feed";
import Veiculos from "../components/Veiculos";
import Rotas from "../components/Rotas";

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
import PagesNavbar from "components/Navbars/ExamplesNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";


class Dashboard extends React.Component {
	constructor(props){
		super(props);
		this.state = {
		  nome: "",
		  imagem: "",
		  motorista: "",
		  tipoUsuario: "",
		  paginaAtual: <Inicio />,
		  
		  showContainerMotorista: '',
		  showBtnMotorista: '',
		}

		this.mostrarDados();
		this.tornarMotorista = this.tornarMotorista.bind(this);
		this.styleWrapper = {background: 'linear-gradient(-60deg, #dddddd 0 45%, #ccc 45% 75%, #dddddd 75% 100%)'};
	}
  
	mostrarDados() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				firebase.database().ref('usuario').on('value', snapshot => {
					let dadosUsuario = snapshot.child(user.uid);
					let state = {};
					state.nome = dadosUsuario.val().nome;
					state.imagem = dadosUsuario.val().imagem;
					state.motorista = dadosUsuario.val().motorista;
					state.tipoUsuario = state.motorista ? "Motorista" : "Passageiro";
					state.showContainerMotorista = state.motorista ? "block" : "none";					
					state.showBtnMotorista = state.motorista ? "none" : "block";					
					
					this.setState(state);
				});
			} 
		});
	}
	
	tornarMotorista() {
		this.setState({showBtnMotorista:'none', showContainerMotorista:'block'});
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				firebase.database().ref('usuario').child(user.uid).update({motorista: true});
			} 
		});
	}
  
  
  
  componentDidMount() {
    document.body.classList.toggle("register-page");
    document.title = 'Dashboard - Omni';
  }
  componentWillUnmount() {
    document.body.classList.toggle("register-page");
    
  }

  componentWillUpdate(nextProps, nextState){
    localStorage.setItem('contatos', JSON.stringify(nextState.nextProps));
  }

  
  render() {
    return (
      <>
        <PagesNavbar />
        <div className="wrapper" style={this.styleWrapper}>
          <div className="page-header">
            <div className="page-header-image" />
            <div className="content">
              <Container>
                <Row>
                  <Col className="offset-lg-0 offset-md-3" lg="3" md="12">
					
                    <Card className="card-register p-0" style={{width: 250, 'boxShadow':'0 5px 10px rgba(0, 0, 0, .3)'}}>
					 <CardHeader>
							<img src={this.state.imagem} className="m-0 rounded-0"></img>
							<CardTitle style={{'color': '#ddd'}}>{this.state.nome}</CardTitle>
					  </CardHeader>
                      <CardBody className="p-0">
						
						<Button color="primary" className="btn w-100 m-0 rounded-0" onClick={() => this.setState({paginaAtual:<Inicio/>})} >
                          Início
                        </Button>
						
                         <Button color="primary" className="btn w-100 m-0 rounded-0" onClick={() => this.setState({paginaAtual:<Feed/>})}>
                          Feed
                        </Button>
						
						
						
						<Container className="p-0" style={{display: this.state.showContainerMotorista}} >
							<Button color="primary" className="btn w-100 m-0 rounded-0" onClick={() =>  this.setState({paginaAtual:<Veiculos/>})}>
							  Veículos
							</Button>
								
							 <Button color="primary" className="btn w-100 m-0 rounded-0" onClick={() => this.setState({paginaAtual:<Rotas/>})}>
							  Rotas
							</Button>
						</Container>
						
						<Button className="rounded-0 w-100"  style={{display: this.state.showBtnMotorista}} color="danger" size="md" onClick={this.tornarMotorista}>
                          Tornar-se motorista
                        </Button>
						<div className="clearfix pt-2">
							<Label color="neutral" className="m-2">{this.state.tipoUsuario}</Label>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
				  
				  <Col className="offset-lg-0 offset-md-3" lg="9" md="12">
				  {this.state.paginaAtual}
				  </Col>
				  
                </Row>
                <div className="register-bg" />
                
              </Container>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }
}
export default Dashboard;