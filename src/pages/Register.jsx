import React, { useState, useEffect, useContext } from "react";
import { CheckLogin} from "../components/context/LoginContext";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { FcGoogle } from "react-icons/fc";
import Form from "react-bootstrap/Form";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../auth/firebase";
import "./LoginRegisterStyle.css";

function Register() {
  //set the variables
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const { check, setCheck } = useContext(CheckLogin);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);
  console.log(user);
  const register = async (e) => {
    //in order to prevent refleshing the page
    e.preventDefault();
    localStorage.setItem("email", "");
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      localStorage.setItem("email", registerEmail);
      if (!check) {
        setCheck(true);
        navigate("/main");
      } else if (user !== null) {
        setCheck(true);
        navigate("/main");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  //design register page
  return (
    <Form className="formdiv" onSubmit={register}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          required
          onChange={(e) => {
            setRegisterEmail(e.target.value);
          }}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          required
          onChange={(e) => {
            setRegisterPassword(e.target.value);
          }}
        />
      </Form.Group>
      <Button variant="light" type="submit" onClick={register}>
        register
      </Button>
      <Button variant="light" type="submit" onClick={() => navigate("/login")}>
        <FcGoogle /> Or Sigin with Gmail
      </Button>
      <Button variant="danger" type="submit" onClick={() => navigate("/login")}>
        Back to Login Page
      </Button>
    </Form>
  );
}

export default Register;
