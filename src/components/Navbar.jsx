import React, { useContext, useEffect} from "react";
import { CheckLogin, Logout } from "../components/context/LoginContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Navbar.css";

function NavbarMovie() {
  const { logout } = useContext(Logout);
  const {check} = useContext(CheckLogin)

  useEffect(()=>{
    console.log(sessionStorage.getItem("name"));
  },[])
   
  return (
    <div className="ComboNav ">

   <div className="nav ">
   <Navbar bg="light" expand="lg" >
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          {!check && <Nav.Link className="Navi" href="/login">Login</Nav.Link>}
           {check && <Nav.Link className="Navi" href ="/" onClick={(e) => logout(e)}>Logout</Nav.Link>}
            {!check &&<Nav.Link className="Navi" href="/register">Register</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
   </div>
   <div className="NavLeft ">
       
          {check && (
            <div className="profile">
              <div className="divimg ">
                <img alt="" src={localStorage?.getItem("profilePic")} />
              </div>
              <div className="divp mx-4">
                <p>{localStorage?.getItem("name")}</p>
                <p>{localStorage?.getItem("email")}</p>
              </div>
            </div>
          )}
           <div className="leftnav ">
            <p>React Movie App</p>
         </div>
        
         </div>
    </div>
  );
}

export default NavbarMovie;
