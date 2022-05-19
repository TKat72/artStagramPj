import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "./Footer.css"


export default function Footer() {

    return (
        <div className="footer">
            <p>Created by Kat Tsymbal <NavLink style={{ fontSize: "25px" }} to="https://github.com/TKat72"><i className="fa-brands fa-github"></i></NavLink>  <NavLink to="https://www.linkedin.com/in/kateryna-tsymbal-2824b219a/"> <i style={{ fontSize: "25px" }} className="fa-brands fa-linkedin"></i></NavLink> </p>
        </div>
    )
}
