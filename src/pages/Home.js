import {Link} from "react-router-dom";
import React from "react";
import Button from '@material-ui/core/Button';
import {Grid, Paper} from "@material-ui/core";
import styled from "styled-components";

const Home = () => {

  const CardItem = styled(Button)`
    background-color: white;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.06);
    margin: 10% 2%;
    width: 30%;
  `;

  return (
    <div>
      <Link to="/todo" >
       <CardItem>할일</CardItem>
      </Link>
      <Link to="/blog">
        <CardItem>블로그</CardItem>
      </Link>
    </div>
  );
};

export default Home;