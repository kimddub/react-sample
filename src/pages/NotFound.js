import {Link, Outlet, useNavigate} from 'react-router-dom';
import classNames from "classnames";
import styles from "../styles/App.module.css";
import React from "react";
import logo from "../assets/logo.svg";

const NotFound = () => {

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 64,
      position: 'absolute',
      width: '100%',
      height: '100%',
    }}>

      <h1 onClick={goBack} >404 :(</h1>
    </div>
  )
};

export default NotFound;