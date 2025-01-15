import { createContext, useEffect, useState } from 'react'
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from '../Firebase/firebase.config';





export const AuthContext = createContext(null) 

const auth = getAuth(app)

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = ()=>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = ()=>{
        setLoading(true)
        return signOut(auth)
    }

    const updateUserProfile = (name, photo)=>{
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        } )
    }

     // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setLoading(false)
      
      // console.log('CurrentUser-->', currentUser)

    //   if(currentUser?.email){
    //     const user = { email: currentUser.email }

    //     axios.post(`${import.meta.env.VITE_API_URL}/jwt`, user, {withCredentials: true})
    //     .then(res => {
    //       // console.log(res.data)
    //       setLoading(false)
    //     })
            
    //   }
    //   else {
    //     axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, {withCredentials: true})
    //     .then(res => {
    //       // console.log(res.data)
    //       setLoading(false)
    //     })
    //   }

    })
    
    return () => {
      return unsubscribe()
      
    }
  }, [])




    const authInfo = {
        user,
        setUser,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        updateUserProfile
    }

    
    return (
      <AuthContext.Provider value={authInfo}>
        {children}
      </AuthContext.Provider>
    );
};

export default AuthProvider;