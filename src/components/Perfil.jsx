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


class Perfil extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      nome: '',
      usuario: '',
      lista: []
    }
	
  this.Listar = this.Listar.bind(this);
  }
 
  Listar() {
	alert("dsd");
  }
  
  componentDidMount() {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", this.followCursor);
  }
  componentWillUnmount() {
    document.body.classList.toggle("register-page");
    document.documentElement.removeEventListener(
        "mousemove",
        this.followCursor
    );
  }
  
  
  render() {
    return (
        <>
          <div className="wrapper">
              <div className="content">
                <Container>
                  <Row>
                    <Col className="offset-lg-0 offset-md-3">
                     
                      <Card className="card-register">
						<CardHeader>
							<CardTitle>{this.state.nome}</CardTitle>
						</CardHeader>
                        <CardBody>
                          <Form className="form" >
                          <InputGroup>
                              
                            </InputGroup>
                              
                              <div>
                                Nome: {this.state.nome} <br/>
                                E-mail: {this.state.email} <br/>
                                <Button onClick={this.seguir}>Seguir</Button><br/><br/>
                              </div>
                            
                          })}
                            <Button className="btn">
                              Editar
                            </Button>
                          </Form>
                        </CardBody>                        
                      </Card>
                    </Col>
                  </Row>
                </Container>
             
			</div>
		</div>
		</>
    );
  }
}

export default Perfil;