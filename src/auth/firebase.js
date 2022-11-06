import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import NavbarMovie from "../components/Navbar";


const firebaseConfig = {
  apiKey: "AIzaSyDhJATf_CDzLxBDHIs1qX2KyMdsPm3qVME",
  authDomain: "react-firebase-b155b.firebaseapp.com",
  projectId: "react-firebase-b155b",
  storageBucket: "react-firebase-b155b.appspot.com",
  messagingSenderId: "255067758398",
  appId: "1:255067758398:web:29a4d85d3b4befed53166f",
  measurementId: "G-8GNE8KT9PY"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
const provider = new GoogleAuthProvider()


export const SignInWithGoogle = (e) => {

  e.preventDefault()
  signInWithPopup(auth, provider).then((result) => {

    const name = result?.user?.displayName
    const email = result?.user?.email
    const profilePic = result?.user?.photoURL
    localStorage.setItem("name", name)
    localStorage.setItem("email", email)
    localStorage.setItem("profilePic", profilePic)

   
    console.log(result);
  }).catch((error) => {
    console.log(error)
  })
}



