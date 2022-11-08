import {  onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import React, {useState, useEffect,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle} from "react-icons/fc"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { auth, SignInWithGoogle } from '../auth/firebase';
import { CheckLogin} from '../components/context/LoginContext';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./LoginRegisterStyle.css"


function Login() {
//keep user info
    const [LoginEmail, setLoginEmail] = useState("")
    const [LoginPassword, setLoginPassword] = useState("")
    const [user,setUser] = useState({})
    //useContext used to check whether successfully login or not
    const {check, setCheck} = useContext(CheckLogin)
    //to navigate other pages
    const navigate = useNavigate()
    const notify = () => toast(`♟️ Welcome to application login page!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });

    useEffect(()=>{
      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })
    notify() 
    },[]);
    
    //check login infos from firebase
    const login = async (e) => {
      e.preventDefault();
      // setCheckError(false);
      try {
        const user = await signInWithEmailAndPassword(
          auth,
          LoginEmail,
          LoginPassword
        );
        //keep the values in the local storage if user can login
        localStorage.setItem("email", LoginEmail)
        console.log(user);
        console.log(check);
        if (!check){
              //to open all closed pages
                setCheck(true)
                navigate("/main")
            }

      } catch (error) {
        alert(error.message)
      }
    };
  

    //login function via firebase
    const goggleLogin = (e) =>{
      e.preventDefault()
      // setCheckError(false)
      try{
        SignInWithGoogle(e)
     
      }catch(error){
        console.log(error);
        // setCheckError(true)
      }
  
    }
  
    //if google account is active following case will start and main page will display
    console.log( localStorage.getItem("name"));
    if (localStorage.getItem("name") !== null){
      setCheck(true)
      navigate("/main")
    }
  
  //login section
  return (
    <Form className='formdiv'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e) =>{setLoginEmail(e.target.value)}}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e) =>{setLoginPassword(e.target.value)}} />
      </Form.Group>
      <Button variant="light" type="submit" onClick={(e)=>login(e)}>
        Login
      </Button>
      <Button variant="light" type="submit" onClick={(e)=>{goggleLogin(e)}}>
      <FcGoogle /> Login with google
      </Button>
      <ToastContainer />
    </Form>
  );
}

export default Login;