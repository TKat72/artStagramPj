
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


          {sessionUser &&
            <>
              <div className='loginUserNav' >
                <div className='haverOver'>
                  <NavLink className='haverOver' to='/profile' ><i style={{ fontSize: "23px", marginRight: "20px", color: "purple" }} className="fa-solid fa-user haverOver"></i></NavLink>
                  <p className='hiden' >Profile</p>
                </div>
                <div className='haverOver'>
                  <AddNewPostModel></AddNewPostModel>
                  <p className='hiden' >new post</p>
                </div>
                <div className='haverOver'>
                  <LogoutButton />
                  <p className='hiden' >log out</p>
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
