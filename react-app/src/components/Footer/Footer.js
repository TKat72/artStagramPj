import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "./Footer.css"


export default function Footer() {

    return (
        <div className="footer">
            <p>Created by Kat Tsymbal <a style={{ fontSize: "25px" }} href="https://github.com/TKat72" target="_blank"><i className="fa-brands fa-github"></i></a>  <a href="https://www.linkedin.com/in/kateryna-tsymbal-2824b219a/" target="_blank"> <i style={{ fontSize: "25px" }} className="fa-brands fa-linkedin"></i></a> </p>
        </div>
    )
}
