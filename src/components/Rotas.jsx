import React from "react";
import classnames from "classnames";
import Optgroup from "../components/Optgroup";
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


class Rotas extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      nome: '',
	  horario: '',
	  descricao: '',
	  veiculo: '',
    }
	
	this.Cadastrar = this.Cadastrar.bind(this);
	this.opcoes = this.func();
  }
  
  
  func() {
	  var user = firebase.auth().currentUser;
	  var veiculos = [];
	  firebase.database().ref("veiculo").on(
				"value", 
				function(snapshot) {	
					
					
					snapshot.forEach(function(childSnapshot) {
						
								let idProprietario = childSnapshot.child('proprietario').val();
						
						if (user.uid == idProprietario) {
							
							let key = childSnapshot.key;
							let modelo = childSnapshot.child('modelo').val();
							let dadosModelo = {
								value: key, 
								label: modelo};
							veiculos.push(dadosModelo);
						}	
					});
				});
					
				return veiculos;
  }
  
 
  Cadastrar() {
	var user = firebase.auth().currentUser;
	if (user) {
    alert("Rota cadastrada com sucesso!")
		firebase.database().ref('rota').push().set({
                nome:this.state.nome,
				motorista:user.uid,
				horario:this.state.horario,
				descricao:this.state.descricao,
				veiculo:this.state.veiculo,
        })
	    .then(()=>{
			this.setState({
				nome:'',
				horario:'',
				descricao:'',
				veiculo:'',
			})
	    });
	}
	
  }  
	
	
  
  
  state = {
    squares1to6: "",
    squares7and8: ""
  };
  
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
  followCursor = event => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    this.setState({
      squares1to6:
          "perspective(500px) rotateY(" +
          posX * 0.05 +
          "deg) rotateX(" +
          posY * -0.05 +
          "deg)",
      squares7and8:
          "perspective(500px) rotateY(" +
          posX * 0.02 +
          "deg) rotateX(" +
          posY * -0.02 +
          "deg)"
    });
  };
  render() {
    return (
        <>
          <div className="wrapper" lg="12">
              <div className="content">
                <Container style={{'background': '#1f2251', 'overflow-y': 'auto', 'maxHeight': '80%'}}>
                  <Row>
                    <Col className="offset-lg-0 offset-md-3" lg="12">
                      
                      <Card className="card-register w-100">
                        
                        <CardBody>
                          <Form className="form" >
                            <InputGroup
                                className={classnames({
                                  "input-group-focus": this.state.fullNameFocus
                                })}>
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="tim-icons icon-single-02" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                  placeholder="Nome"
                                  type="text"
                                  onChange={(e) => this.setState({nome:e.target.value})}
                              />
								
                            </InputGroup>
                            <InputGroup
                                className={classnames({
                                  "input-group-focus": this.state.fullNameFocus
                                })}>
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="tim-icons icon-single-02" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input placeholder="Horário"
                                  onChange={(e) => this.setState({horario:e.target.value})}
                              />
                            </InputGroup>
                            <InputGroup
                                className={classnames({
                                  "input-group-focus": this.state.fullNameFocus
                                })}>
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="tim-icons icon-single-02" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input placeholder="Descrição"
                                  onChange={(e) => this.setState({descricao:e.target.value})}
                              />
                            </InputGroup>
                            <InputGroup
                                className={classnames({
                                  "input-group-focus": this.state.fullNameFocus
                                })}
                            >
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="tim-icons icon-single-02" />
                                </InputGroupText>
                              </InputGroupAddon>
							  
							<Input type="select" style={{'backgroundColor': '#1f2251'}} onChange={(e) => this.setState({veiculo:e.target.value})}>
								<option>Selecione um veículo</option>
                <Optgroup optionsList={this.opcoes}/>
							</Input>
                            </InputGroup>
                            <Button type="button" color="success" onClick={this.Cadastrar}>
							  Cadastrar {this.state.nome}
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
export default Rotas;