import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FcGoogle} from "react-icons/fc"
import Form from 'react-bootstrap/Form';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import 'react-toastify/dist/ReactToastify.css';
import {auth} from "../auth/firebase"
import "./LoginRegisterStyle.css"

function Register() {
    const [registerEmail, setRegisterEmail] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")
    const [user,setUser] = useState({})
    const navigate = useNavigate()


    useEffect(()=>{
      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    }) 
    });
console.log(user);
    const register = async () => {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          registerEmail,
          registerPassword
        );
        console.log(user);
      } catch (error) {      
        alert(error.message)
        }
    };
    
  

  return (

    <Form className='formdiv'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" required onChange={(e) =>{setRegisterEmail(e.target.value)}}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" required onChange={(e) =>{setRegisterPassword(e.target.value)}}/>
      </Form.Group>
      <Button variant="light" type="submit" onClick={register}>
        register  
      </Button>
      <Button variant="light" type="submit" onClick={()=>navigate("/login")}>
      <FcGoogle /> Or Sigin with Gmail
      </Button>
      <Button variant="danger" type="submit" onClick={()=>navigate("/login")}>
      Back to Login Page
      </Button>
    </Form>
   
  
  );
}

export default Register;