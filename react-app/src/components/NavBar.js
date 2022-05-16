
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from "react-redux"
import AddNewPostModel from "./addNewPost"

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  return (
    <nav >
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
                Login
              </NavLink>

              <NavLink to='/sign-up' exact={true} activeClassName='active'>
                Sign Up
              </NavLink>
            </div>
          }
          {sessionUser &&
            <>
              <div className='loginUserNav' >
                <NavLink to='/users' exact={true} activeClassName='active'>
                  Users

                </NavLink>

                <AddNewPostModel></AddNewPostModel>

                <LogoutButton />
              </div>
            </>
          }
        </div>
      </div >
    </nav >
  );
}

export default NavBar;
