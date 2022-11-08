import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"


// env. is used for security reasons
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

//firebase initialization copied from its official site
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export const SignInWithGoogle = (e) => {

  e.preventDefault()
  signInWithPopup(auth, provider).then((result) => {

      // set following variables from firebase and optinal chaining is used in order to prevent error message
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



