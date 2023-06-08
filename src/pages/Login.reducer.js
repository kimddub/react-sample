import {Link, Navigate, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import axios from 'axios';
import {useEffect, useReducer, useState} from "react";
import styled, {css} from "styled-components";
import {MdLogin, MdRefresh} from "react-icons/md";
import {AppProvider, useAppDispatch, useAppPath, useAppState} from "../context/AppContext";

const UserTemplateBlock = styled.li`
  background-color: #f5f5f5;
  width: 80%;
  padding: 10px;
  margin: 10px auto;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
  list-style-type: none;

  &:hover {
    width: 100%;
    padding: 20px;
    font-weight: bold;
    background-color: #ffffff;
  }
  
  ${props =>
          props.active &&
          css`
            width: 100%;
            padding: 20px;
            font-weight: bold;
            color: var(--effect-color);
            background-color: #ffffff;
    `}
`;

const LoginTemplateBlock = styled.button`
  width: 100%;
  border: none;
  padding: 10px;
  border-radius: 10px;
  margin-right: 0;
  color: white;
  background-color: gray;
  cursor: pointer;
  
  ${props =>
          props.ready &&
          css`
            background-color: var(--effect-color);
    `}
`;

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error
      };
    case 'CLICK':
      return {
        ...state,
        data: state.data.map(user => user.id === action.userId ? {...user, active: true} : {...user, active: false})
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
const Login = () => {

  const redirectPath = useAppPath();
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null
  });

  const [ready, setReady] = useState(false);

  const fetchUsers = async () => {
    dispatch({ type: 'LOADING' });
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      );
      dispatch({ type: 'SUCCESS', data: response.data });
    } catch (e) {
      dispatch({ type: 'ERROR', error: e });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const { loading, data: users, error } = state; // state.data 를 users 키워드로 조회


  if (loading) return <div><h1>LOADING..</h1></div>;
  if (error) return <div><h1>ERROR</h1></div>
  if (!users) return null;

  const onClick = (userId) => {
    dispatch({type: 'CLICK', userId});
    setReady(true);
  };

  const onLogin = () => {
    const activeUser = users.filter(user => user.active);

    if (activeUser.length < 1) return false;

    appDispatch({
      type: 'LOGIN',
      user: activeUser[0]
    });
    navigate(redirectPath.current);
  };

  return (
    <div>
      <h1>계정 목록 <span onClick={fetchUsers}><MdRefresh></MdRefresh></span></h1>
      <ul>
        {users.map(user => (
          <User user={user} onClick={ () => { onClick(user.id)} }></User>
        ))}
      </ul>
      <LoginTemplateBlock ready={ready} onClick={onLogin}>로그인 <MdLogin></MdLogin></LoginTemplateBlock>
    </div>
  );
};

const User = ({user, onClick}) => {

    return (
      <>
        <UserTemplateBlock key={user.id} onClick={onClick} active={user.active}>
          {user.username} ({user.name})
        </UserTemplateBlock>
      </>
  )
};

export default Login;