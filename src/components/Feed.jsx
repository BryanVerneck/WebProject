import React from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import firebase from 'firebase';
import '../Conexao';
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

class Feed extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      titulo: '',
	  corpo: '',
	  imagem:'',
	
      lista: [],
    }
	
	this.publicar = this.publicar.bind(this);
	
	firebase.database().ref('publicacao').orderByChild("data").on('value', snapshot => {
        let state = this.state;
        state.lista = [];
        snapshot.forEach((child) => {
          state.lista.push({
            titulo: child.val().titulo,
			imagem: child.val().imagem,
			corpo: child.val().corpo,
			data: child.val().data,
          })
        });
        state.lista = state.lista.reverse();
        this.setState(state);
    });
	  
  }

	publicar(e){
		firebase.auth().onAuthStateChanged((user) => {
			if(user){				
				var dataAtual = new Date();
				dataAtual = dataAtual.toLocaleDateString() + " " + dataAtual.toLocaleTimeString();
				
				firebase.database().ref('publicacao').push().set({
				  autor: user.uid,
				  titulo: this.state.titulo,
				  imagem: this.state.url,
				  corpo: this.state.corpo,
				  data: dataAtual,
				})
			  .then(()=>{
				this.setState({
				  titulo: '',
				  corpo: '',
				})
			  });
			}
		
		});
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
		  <Container style={{'background': '#1f2251', 'overflow-y': 'auto', 'maxHeight': '80vh'}}>
			  <div className="content">
				<Card>
				 <Form className="form" >
					<InputGroup>
                        <Input placeholder="Título" className="w-100 m-2" type="text" 
						onChange={(e) => this.setState({titulo:e.target.value})} /> 
						<Input placeholder="Corpo" className="w-100 m-2" type="text" 
						onChange={(e) => this.setState({corpo:e.target.value})} /> 
						 <Input className="w-100 m-2 p-2"
                              placeholder="Imagem"
                              type="file"
                              onChange={this.file}
                            />
                    </InputGroup>
                    <Button className="btn" color="success" type="button" onClick={this.publicar}>Publicar</Button>
				 </Form></Card>
			  </div>
              <div className="content">
                <Container>
                  <Row>
                    <Col className="offset-lg-0 offset-md-3" lg="12" md="12">
                          <Container>
                              {this.state.lista.map((post) => {
                            return(
                              <Card ld="3">
								<CardHeader>
									<img className="img-post" src={post.imagem} />
								</CardHeader>
								<CardBody>
									<h2 className="text-left w-100 post__titulo">{post.titulo}</h2>
									<div className="text-left post__autoria">
										
										<div className="text-left post__dados-autoria">
											<div className="text-left w-100 post__data">{post.data}</div>
										</div>
									</div>
									<div className="text-left w-100 post__corpo">
										<p>{post.corpo}</p>
									</div>
								</CardBody>
                              </Card>
                            )
                          })}
                          </Container>
                        
						
                    </Col>
                  </Row>
                </Container>
              </div>
            </Container>
          </div>
        </>
    );
  }
}

export default Feed;