import React,{useState} from "react"
import { signOut } from 'firebase/auth';
import { auth } from "../auth/firebase";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavbarMovie from "../components/Navbar";
import MovieDetail from "../pages/MovieDetail";
import Home from "../pages/Home";
import Login from "../pages/Login"
import Register from "../pages/Register"
import { CheckLogin,Logout} from "../components/context/LoginContext"
import Main from "../pages/Main";
export const AppRouter = () =>{
    const [check, setCheck] = useState(false)
    const logout = async () => {
        await signOut(auth);
        setCheck(false)
        console.log(check)
        localStorage.clear();
      };
    return (
        <CheckLogin.Provider value={{check,setCheck}}>
        <Logout.Provider value={{logout}}>
        <BrowserRouter>
        <NavbarMovie />
        <Routes>
            {!check && <Route path="/" element = {<Home />} />}
            <Route path="/login" element = {<Login />} />
            <Route path="/register" element = {<Register />} />
            {/* instead of using private router i prefer short circuit method via useContext hook with named check key */}
            {check &&<Route path="/moviedetail/:id" element={<MovieDetail />}/>}
            {check &&<Route path="/main" element={<Main />} />}
        </Routes>
        </BrowserRouter>
       </Logout.Provider>
       </CheckLogin.Provider>
    )
}