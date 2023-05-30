import {Link} from "react-router-dom";
import React from "react";

const Home = () => {
  return (
    <div>
      <Link to="/todo?isLoggedIn=N" >할일</Link>
      <Link to="/blog">블로그</Link>
    </div>
  );
};

export default Home;