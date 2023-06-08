/* eslint-disable */

import React from 'react';

import { Route, Routes } from 'react-router-dom';

import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Todo from "./pages/Todo";
import Layout from "./pages/Layout";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import {createGlobalStyle} from "styled-components";
import {AppProvider} from "./context/AppContext";
import {UsersProvider} from "./context/UsersContext";

function App() {

  const GlobalStyle = createGlobalStyle`
    body {
      background: #e9ecef;
    }
  `;

  return (
    <>
      <AppProvider>
        <UsersProvider>
          <GlobalStyle />
          <Routes>
            <Route element={<Layout />} >
              <Route index element={<Home />} />
              <Route path="/todo" element={<Todo />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/login" element={<Login />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </UsersProvider>
      </AppProvider>
    </>
  );
}
export default App;
