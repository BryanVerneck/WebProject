import firebase from 'firebase';
import '../Conexao'
import React from "react";
import classnames from "classnames";
import 'firebase/storage';
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

class Cadastro extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    DataNasc: '',
    imagem: '',
    };
    this.cadastrar = this.cadastrar.bind(this);

      firebase.auth().onAuthStateChanged((user) => {
        if(user){
          firebase.database().ref('usuario').child(user.uid).set({
            nome:this.state.nome,
            email: this.state.email,
            senha: this.state.senha,
            DataNasc: this.state.DataNasc,
            imagem: this.state.url
          })

          .then(()=>{
            this.setState({
              nome:'',
              email:'',
              senha:''
            })
          });
        }
      });
      
    }
    
      //firebase.auth().signOut();
     
    cadastrar(e){
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.senha)
        .then((success) => {
            alert('Cadastrado com sucesso!');
            this.props.history.replace("/dashboard");
        })
        .catch((error) => {
            if(error.code === 'auth/invalid-email'){
                alert('E-mail inválido');
            }
            if(error.code === 'auth/weak-password'){
                alert('Senha fraca')
            }
        })
        e.preventDefault();

    }

    file = async(e) => {
        var imagem = e.target.files[0];
        await this.setState({imagem :imagem});
        var uploadFile = firebase.storage()
        .ref('images/' + this.state.uid + '/' + this.state.imagem.name)
        .put(this.state.imagem);
  
        uploadFile.on('state_changed',
        (progresso)=>{
           var progress = Math.round(
          (progresso.bytesTransferred / progresso.totalBytes) * 100 
        );
        this.setState({qtdeLoading: progress });
        },
        (error)=>{
  
        },  
        ()=>{
          firebase.storage().ref('images/' + this.state.uid + '/' + this.state.imagem.name)
          .getDownloadURL()
          .then((url) => {
            this.setState({url: url});
        });
      });    
    }

  state = {
    squares1to6: "",
    squares7and8: ""
  };
  componentDidMount() {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", this.followCursor);
    document.title = 'Cadastro - Omni';
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
        <IndexNavbar />
        <div className="wrapper">
          <div className="page-header">
            <div className="page-header-image" />
            <div className="content">
              <Container>
                <Row>
                  <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                    <div
                      className="square square-7"
                      id="square7"
                      style={{ transform: this.state.squares7and8 }}
                    />
                    <div
                      className="square square-8"
                      id="square8"
                      style={{ transform: this.state.squares7and8 }}
                    />
                    <Card className="card-register">
                      <CardHeader>
                        <CardImg
                          alt="..."
                          src={require("assets/img/square-purple-1.png")}
                        />
                        <CardTitle tag="h4">cadastro</CardTitle>
                      </CardHeader>
                      <CardBody>
                        <Form className="form" onSubmit={this.cadastrar}>
                        <InputGroup
                            className={classnames({
                              "input-group-focus": this.state.fullNameFocus
                            })}
                          >
                            Imagem de usuário:
                            <Input
                              placeholder="Nome"
                              type="file"
                              onFocus={e =>
                                this.setState({ fullNameFocus: true })
                              }
                              onBlur={e =>
                                this.setState({ fullNameFocus: false })
                              } onChange={this.file}
                            />
                            <progress value={this.state.qtdeLoading} max="100"/>
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
                            <Input
                              placeholder="Nome"
                              type="text"
                              onFocus={e =>
                                this.setState({ fullNameFocus: true })
                              }
                              onBlur={e =>
                                this.setState({ fullNameFocus: false })
                              } onChange={(e) => this.setState({nome:e.target.value})}
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
                            <Input
                              placeholder="Sobrenome"
                              type="text"
                              onFocus={e =>
                                this.setState({ fullNameFocus: true })
                              }
                              onBlur={e =>
                                this.setState({ fullNameFocus: false })
                              }
                            />
                          </InputGroup>
                          <InputGroup
                            className={classnames({
                              "input-group-focus": this.state.emailFocus
                            })}
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-email-85" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Email"
                              type="email"
                              onFocus={e => this.setState({ emailFocus: true })}
                              onBlur={e => this.setState({ emailFocus: false })}
                              onChange={(e) => this.setState({email:e.target.value})}
                            />
                          </InputGroup>
                          <InputGroup
                            className={classnames({
                              "input-group-focus": this.state.passwordFocus
                            })}
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-lock-circle" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Senha"
                              type="password"
                              onFocus={e =>
                                this.setState({ passwordFocus: true })
                              }
                              onBlur={e =>
                                this.setState({ passwordFocus: false })
                              } 
                              onChange={(e) => this.setState({senha:e.target.value})}
                            />
                          </InputGroup>
						  <InputGroup
                            className={classnames({
                              "input-group-focus": this.state.passwordFocus
                            })}
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-lock-circle" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Confirmar senha"
                              type="password"
                              onFocus={e =>
                                this.setState({ passwordFocus: true })
                              }
                              onBlur={e =>
                                this.setState({ passwordFocus: false })
                              }
                            />
                          </InputGroup>
						  <InputGroup
                            className={classnames({
                              "input-group-focus": this.state.passwordFocus
                            })}
                          >
                            <Label className="w-100">Data de nascimento</Label>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-lock-circle" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Data de Nascimento"
                              type="date"
                              onFocus={e =>
                                this.setState({ passwordFocus: true })
                              }
                              onBlur={e =>
                                this.setState({ passwordFocus: false })
                              } onChange={(e) => this.setState({DataAniver:e.target.value})}
                            />
                          </InputGroup>
						  <InputGroup
                            className={classnames({
                              "input-group-focus": this.state.passwordFocus
                            })}
                          >
                          </InputGroup>
                          <FormGroup check className="text-left">
                            <Label check>
                              <Input type="checkbox" />
                              <span className="form-check-sign" />Concordo com os{" "}
                              <a
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                              >
                                Termos e Condições
                              </a>
                              .
                            </Label>
                          </FormGroup>
                          <CardFooter>
                        <Button className="btn-round" color="primary" size="lg" type='submit'>
                          Cadastrar-se
                        </Button>
                      </CardFooter>
                        </Form>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <div className="register-bg" />
                <div
                  className="square square-1"
                  id="square1"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-2"
                  id="square2"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-3"
                  id="square3"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-4"
                  id="square4"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-5"
                  id="square5"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-6"
                  id="square6"
                  style={{ transform: this.state.squares1to6 }}
                />
              </Container>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }
}
export default Cadastro;
