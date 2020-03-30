import React from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import firebase from 'firebase';
import '../Conexao';
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


class Veiculos extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modelo: '',
      ano: '',
	    placa: '',
	    capacidade: '',
      observacoes: '',
    }
    this.Cadastrar = this.Cadastrar.bind(this);
  }

    Cadastrar(e){
      var user = firebase.auth().currentUser;
      if(user){
        alert("cadastrado com sucesso")
        firebase.database().ref('veiculo').push().set({
          proprietario: user.uid,
          modelo: this.state.modelo,
          ano: this.state.ano,
          placa: this.state.placa,
          capacidade: this.state.capacidade,
          observacoes: this.state.observacoes,
        })
      .then(()=>{
        this.setState({
          modelo: '',
          ano: '',
          placa: '',
          capacidade: '',
          observacoes: '',
        })
      });
    }
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
              <Container style={{'background': '#1f2251', 'overflow-y': 'auto', 'maxHeight': '80%'}}>
                <Row>
                  <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                    <div
                      className="square square-7"
                      id="square7"
                      style={{ transform: this.state.squares7and8 }}/>
                    <div
                      className="square square-8"
                      id="square8"
                      style={{ transform: this.state.squares7and8 }}/>
                    <Card className="card-register">

                      <CardBody>
                        <Form className="form" onSubmit={this.Cadastrar}>
                          <InputGroup
                            className={classnames({
                              "input-group-focus": this.state.fullNameFocus
                            })}>
                            
                            <Input
                              placeholder="Modelo"
                                onChange={(e) => this.setState({modelo:e.target.value})}
                              /> 
                          </InputGroup>
						              <InputGroup
                            className={classnames({
                              "input-group-focus": this.state.fullNameFocus
                            })}>
                            
                            <Input
                              placeholder="Capacidade de passageiros"
                              type="number"
                              onFocus={e =>
                                this.setState({ fullNameFocus: true })
                              }
                              onBlur={e =>
                                this.setState({ fullNameFocus: false })}
                                onChange={(e) => this.setState({capacidade:e.target.value})}
                                /> 
                          </InputGroup>
                          <InputGroup
                            className={classnames({
                              "input-group-focus": this.state.fullNameFocus
                            })}>
                            
                            <Input
                              placeholder="Ano do veiculo"
                              type="number"
                                onChange={(e) => this.setState({ano:e.target.value})}
                              /> 
                          </InputGroup>
                          <InputGroup
                            className={classnames({
                              "input-group-focus": this.state.fullNameFocus
                            })}
                          >
                            
                            <Input
                              placeholder="Placa do Veículo"
                              type="text"
                              onChange={(e) => this.setState({placa:e.target.value})}
                            />
                          </InputGroup>
                          <InputGroup
                            className={classnames({
                              "input-group-focus": this.state.fullNameFocus
                            })}
                          >
                       
                            <Input
                              placeholder="Informações adicionais"
                              type="text"
                              onChange={(e) => this.setState({observacoes:e.target.value})}
                            />
                          </InputGroup>
                          <Button className="btn" color="success" size="md"
						  onClick={this.Cadastrar}
						  >
                          Cadastrar
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

export default Veiculos;
