import React, { useState } from "react";
import LoginForm from "../LoginForm"
import SignUpForm from "../SignUpForm"
import "./SplashPage.css"


export default function SplashPage() {
    const [showModal, setShowModal] = useState(true)

    return (
        <div className="splashPage">



            <div className="rightSide">
                {showModal ? (
                    <>
                        <div className="loginForm">
                            <h2 style={{ fontFamily: "cursive" }}> ArtStagram</h2>
                            <LoginForm></LoginForm>
                        </div>
                        <div className="SignUpLink">
                            <p>Don't have an account?<span onClick={() => setShowModal(false)} id="sign-up-click"> Sign up</span> </p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="loginForm">
                            <h2 style={{ fontFamily: "cursive" }}> ArtStagram</h2>
                            <SignUpForm></SignUpForm>
                        </div>
                        <div className="SignUpLink">
                            <p>Already have an account?<span onClick={() => setShowModal(true)} id="sign-up-click"> Log in</span> </p>
                        </div>
                    </>
                )}

            </div>



        </div>
    )

}
