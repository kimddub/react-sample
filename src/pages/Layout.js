import {Link, Outlet, useNavigate} from 'react-router-dom';
import classNames from "classnames";
import styles from "../styles/App.module.css";
import React from "react";
import logo from "../assets/logo.svg";
import {Container} from "@material-ui/core";

const Layout = () => {

  const navigate = useNavigate();
  // navigate(-1);
  // navigate('/Blog');

  return (
    <div className={classNames(styles.App)}>

      {/* styles : dash(-) 문자가 들어간 클래스명은 다음과 같이 표기 */}
      <div className={styles['black-nav']}>
        <div style = { { fontSize : '30px', width: '100%', textAlign: 'center'} }>
          <Link to="/"><img src={ logo } style={ { width : '100px' } } /></Link>
        </div>
      </div>
      <Container maxWidth="sm">
        <Outlet />
      </Container>
    </div>
  )
};

export default Layout;