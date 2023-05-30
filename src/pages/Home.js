import {Link} from "react-router-dom";
import React from "react";
import Button from '@material-ui/core/Button';
import {Grid, Paper} from "@material-ui/core";
import styled from "styled-components";

const Home = () => {

  const CardItem = styled(Button)`
    && {
      height: 300px;
    }
  `;

  return (
    <div>
      <Grid container spacing={10} >
        <Grid item xs={6}>
          <Link to="/todo?isLoggedIn=N" >
            <Paper elevation={3}>
              <CardItem>할일</CardItem>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link to="/blog">
            <Paper elevation={3}>
              <CardItem>블로그</CardItem>
            </Paper>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;