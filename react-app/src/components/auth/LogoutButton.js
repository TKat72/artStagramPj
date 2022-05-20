import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push("/")

  };

  return <i style={{ fontSize: "25px" }} className="fa-solid fa-arrow-right-from-bracket haverOver" onClick={onLogout}></i>;
};

export default LogoutButton;
