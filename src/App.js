/* eslint-disable */

import React from 'react';

import { Route, Routes } from 'react-router-dom';

import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Todo from "./pages/Todo";
import Layout from "./pages/Layout";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

function App() {

  return (
    <Routes>
      <Route element={<Layout />} >
        <Route index element={<Home />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
export default App;
