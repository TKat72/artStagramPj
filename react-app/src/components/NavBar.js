
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from "react-redux"
import AddNewPostModel from "./addNewPost"

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  return (
    <nav className="nav-bar">
      <div className="navbar" id="navBar">
        <div>
          <NavLink id="navForHome" to='/' exact={true} activeClassName='active'>
            ArtStagram
          </NavLink>
        </div>
        <div >
          {!sessionUser &&
            <div className="rightNav">
              <NavLink to='/login' exact={true} activeClassName='active'>
                Login/Sign up
              </NavLink>


            </div>
          }
          {sessionUser &&
            <>
              <div className='loginUserNav' >
                <div className='haverOver'>
                  <NavLink to='/profile' ><i style={{ fontSize: "23px", marginRight: "20px", color: "purple" }} className="fa-solid fa-user"></i></NavLink>

                </div>
                <div className='haverOver'>
                  <AddNewPostModel></AddNewPostModel>
                  <p className='hiden' style={{ width: '70px', marginTop: "-5px" }}>new post</p>
                </div>
                <div className='haverOver'>
                  <LogoutButton />
                  <p className='hiden' style={{ width: '50px', marginTop: "-5px" }}>log out</p>
                </div>
              </div>
            </>
          }
        </div>
      </div >
    </nav >
  );
}

export default NavBar;
