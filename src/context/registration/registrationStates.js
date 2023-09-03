"use client"
import { useContext, useState } from "react"
import { useEffect } from "react"
import { redirect, useRouter } from 'next/navigation'
import registrationContext from "./registrationContext"
import loadingAndAlertContext from "../loadingAndAlert/loadingAndAlertContext"

import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth"
import { auth } from "../../../firebase/firebase"
import { json } from "react-router-dom"

const RegistrationStates = (props) => {

    const LoadingContext = useContext(loadingAndAlertContext);
    const { setLoading, setAlert} = LoadingContext;

    const [registeringUser, setRegisteringUser] = useState(null);
    const [user, setUser] = useState(null);

    // const [registeringUser, setRegisteringUser] = useState(41); // for test only
    //const [user, setUser] = useState({ email: "satya123@gmail.com" }); // for test only

    const updateBatch = (batch) => {
        setRegisteringUser(batch);
    }

    const router = useRouter()
    // ------- This function is for NEW user who are willing to register :: SIGN UP
    const googleSignUp = () => {
        const provider = new GoogleAuthProvider()

        signInWithPopup(auth, provider)
            .then((result) => {
                // result is the source data from firebase
                // user loged in then redirect to registration form
                setUser(result.user);
                router.push("/registration/registrationform", undefined, { shallow: true });
            })
            .catch((error) => {
                console.log("Caught error Popup closed" + error);
            });
    }

    const logOut = () => {
        signOut(auth)
    }

    // useEffect(() => {
    //     const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
    //         setUser(currentUser);
    //     })
    //     return () => unSubscribe()
    // }, [])


    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    // ------- registering new User starts------
    const registerNewUser = async (userDetails) => {
        const url = `${baseUrl}/api/user/createUser`;
        const imageFile = userDetails.profilePic;
        const {
            batch, email, password, regNum, rollNum, fName, lName, homeDist, mobile, fieldOfInterest, gradCourse, tag, githubLink, linkedInLink
        } = userDetails;
        const textData = {
            batch, email, password, regNum, rollNum, fName, lName, homeDist, mobile, fieldOfInterest, gradCourse, tag, githubLink, linkedInLink
        }
        let formData = new FormData;
        formData.append('textData', JSON.stringify(textData));
        formData.append('imageFile', imageFile);
        try {
            const register = await fetch(url, {
                method: "POST",
                // headers: {
                //     'Content-Type': 'multipart/form-data',
                // },
                body: formData
            })
            const response = await register.json();
            if (response.success) {
                // user successfully created
                setAlert({
                    alert: true,
                    alertMessage: response.message,
                    alertType: "success"
                })
                // save token 
                localStorage.setItem("token", response.token)
                // set registration details to initial value
                router.push("/", undefined, { shallow: true })
                // redirect to home page after 3 sec
                setTimeout(() => {
                    setRegisteringUser(null)
                    setUser(null)
                    setLoading(false)
                }, 3000);
                // this is for detecting whether to reset form data or not
                return { resetDetails: true }
            } else {
                setLoading(false);
                setAlert({
                    alert: true,
                    alertMessage: response.message,
                    alertType: "error"
                })
                return { resetDetails: false }
            }
        } catch (error) {
            setLoading(false);
            setAlert({
                alert: true,
                alertMessage: "Some unexpected error occurred! Contact site admin or try after some time.",
                alertType: "error"
            });
            return { resetDetails: false }
        }
        //try catch ends
    }
    // ------- registering new User ends------

    return (
        <registrationContext.Provider value={{ registeringUser, setRegisteringUser, updateBatch, user, setUser, googleSignUp, logOut, registerNewUser }} >
            {props.children}
        </registrationContext.Provider>
    )
}


export default RegistrationStates;