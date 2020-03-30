import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';
//import app from './Componentes/autenticacao/Cadastro';

var firebaseConfig = {
  apiKey: "AIzaSyBucrpQ15uhVNmB98B0RUXIK1EPbi27xF4",
  authDomain: "projetoweb-9c06f.firebaseapp.com",
  databaseURL: "https://projetoweb-9c06f.firebaseio.com",
  projectId: "projetoweb-9c06f",
  storageBucket: "projetoweb-9c06f.appspot.com",
  messagingSenderId: "685878747677",
  appId: "1:685878747677:web:df69765f2477210ce8dcf4"
};
firebase.initializeApp(firebaseConfig);
// Initialize Firebase
/*
class Firebase{
    constructor(){
        this.app = firebase.database();
        this.storage = firebase.storage();
    }
    
    getUid(){
      return app.auth().currentUser.uid;
    }

    getEmail(){
      return app.auth().currentUser.email;
    }

    inicializado(){
      return new Promise(resolve => {
        app.auth().onAuthStateChanged(resolve);
      })
    }

    componentDidMount(){
      firebase.inicializado().then(() => {
        alert(firebase.getUid());
      });
    }

    login(email, password){
        return firebase.auth().signInWithEmailAndPassword(email, password)
    }

    logout(){
        return app.auth().signOut();
    }

}
*/
export default firebase;



