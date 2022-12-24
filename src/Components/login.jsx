import React from "react";
import "../styles/login.scss";
import {FcGoogle} from "react-icons/fc";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { auth } from "../utils/firebase";
import {useAuthState} from "react-firebase-hooks/auth"
import {Navigate} from "react-router-dom"


export default function LoginPage() {
    const [user, loading] = useAuthState(auth);

    if (user) return <Navigate to="/" />
    //Sign in with google
    const googleProvider = new GoogleAuthProvider()
    const googleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className="bg-login">
            <h1>Sign Up:</h1>
            <div>
                <button onClick={googleLogin}>
                    <FcGoogle/>
                    Login with google
                </button>
            </div>
        </section>
    )
}