import {Link, Navigate, Outlet, useNavigate} from 'react-router-dom';
import classNames from "classnames";
import styles from "../styles/App.module.css";
import React from "react";
import logo from "../assets/logo.svg";
import {Container} from "@material-ui/core";
import styled, {createGlobalStyle, css} from "styled-components";
import {useAppDispatch, useAppState} from "../context/AppContext";
import {MdLogout} from "react-icons/md";


const LogoutTemplateBlock = styled.div`
  color: white;
  float: right;
  &:hover {
    color: var(--effect-color);
  }
`;

const Layout = () => {

  const loginUser = useAppState().user;
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch({
      type: 'LOGOUT'
    });

    return <Navigate to="/" replace={true} />;
  };

  return (
    <div className={classNames(styles.App)}>

      {/* styles : dash(-) 문자가 들어간 클래스명은 다음과 같이 표기 */}
      <div className={styles['black-nav']}>
        <div style = { { fontSize : '30px', width: '100%', textAlign: 'center'} }>
          <Link to="/"><img src={ logo } style={ { width : '100px' } } /></Link>
          { loginUser.hasOwnProperty('name') &&
            <>
              <span>Hi, {loginUser.name}</span>
              <LogoutTemplateBlock onClick={logout}><MdLogout></MdLogout></LogoutTemplateBlock>
            </>
          }
        </div>
      </div>
      <Container maxWidth="sm">
        <Outlet />
      </Container>
    </div>
  )
};

export default Layout;