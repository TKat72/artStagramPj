import React, { useState } from "react";
import LoginForm from "../LoginForm"
import "./SplashPage.css"

export default function SplashPage() {
    const [showModal, setShowModal] = useState(true)

    return (
        <div className="splashPage">

            <div>
                <img src="mobile-app.png"></img>
            </div>
            <div className="rightSide">
                <div className="loginForm">
                    <h2 style={{ fontFamily: "cursive" }}> ArtStagram</h2>
                    <LoginForm></LoginForm>
                </div>
                <div>
                    <p>dont have an acount </p>
                </div>
            </div>



        </div>
    )

}
