import React, { useContext, useEffect } from "react";
import { CheckLogin, Logout } from "../components/context/LoginContext";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Navbar.css";

function NavbarMovie() {
  const navigate = useNavigate();
  const { logout } = useContext(Logout);
  const { check } = useContext(CheckLogin);

  useEffect(() => {
    console.log(localStorage.getItem("email"));
    //check the results in any side effects
  }, []);

  return (
    //initialization of navbar (bootsrap navbar is used and configured)
    <div className="ComboNav ">
      <div className="nav ">
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {!check && (
                  //check shortcircuit is used in order to prevent entering login pages until register or successfull login
                  <Nav.Link className="Navi" onClick={() => navigate("/login")}>
                    Login
                  </Nav.Link>
                )}
                {check && (
                  <Nav.Link className="Navi" to="/" onClick={(e) => logout(e)}>
                    Logout
                  </Nav.Link>
                )}
                {!check && (
                  <Nav.Link
                    className="Navi"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div className="NavLeft ">
        {check && (
          <div className="profile">
            {/*following div is designed for getting all info from user*/}
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
