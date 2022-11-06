import {  onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import React, {useState, useEffect,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle} from "react-icons/fc"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { auth, SignInWithGoogle } from '../auth/firebase';
import { CheckLogin,CheckError} from '../components/context/LoginContext';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./LoginRegisterStyle.css"


function Login() {

    const [LoginEmail, setLoginEmail] = useState("")
    const [LoginPassword, setLoginPassword] = useState("")
    const [user,setUser] = useState({})
    const {check, setCheck} = useContext(CheckLogin)
    const {checkError, setCheckError} = useContext(CheckError)
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
    
    
    const login = async (e) => {
      e.preventDefault();
      try {
        const user = await signInWithEmailAndPassword(
          auth,
          LoginEmail,
          LoginPassword
        );
        localStorage.setItem("email", LoginEmail)
        console.log(user);
        console.log(check);
        if (!checkError){
              console.log(checkError)
                setCheck(true)
                navigate("/main")
            }

      } catch (error) {
        alert(error.message)
        setCheckError(true)
        console.log(checkError)
      }
    };
  
 

 
  

  const goggleLogin = (e) =>{
    e.preventDefault()
    try{
      SignInWithGoogle(e)
   
    }catch(error){
      console.log(error);
      setCheckError(true)
    }

  }

  console.log( localStorage.getItem("name"));
  if (localStorage.getItem("name") !== null){
    setCheck(true)
    navigate("/main")
  }
  
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