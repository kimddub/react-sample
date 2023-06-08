/* eslint-disable */

import {Link, Navigate, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useReducer, useState} from "react";
import styled, {css} from "styled-components";
import {MdLogin, MdRefresh} from "react-icons/md";
import {AppProvider, useAppDispatch, useAppPath, useAppState} from "../context/AppContext";
import useAsyncHook from "../hooks/useAsync";
import {clickUser, getUsers, useUsersDispatch, useUsersState} from "../context/UsersContext";
import {getUser} from "../services/userApi";

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

const Login = () => {

  const redirectPath = useAppPath();
  const navigate = useNavigate();

  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);

  const appDispatch = useAppDispatch();

  const state = useUsersState();
  const dispatch = useUsersDispatch();
  const { data: users, loading, error } = state.users;

  const fetchData = () => {
    getUsers(dispatch);
  };

  // Hook useAsync
  // const [state, repatch, clickEvent] = useAsyncHook(getUsers, [], true);
  // const { loading, data: users, error } = state; // state.data 를 users 키워드로 조회

  // (start)move to useAsync Hooks
  //
  // const fetchUsers = async () => {
  //   dispatch({ type: 'LOADING' });
  //   try {
  //     const response = await axios.get(
  //       'https://jsonplaceholder.typicode.com/users'
  //     );
  //     dispatch({ type: 'SUCCESS', data: response.data });
  //   } catch (e) {
  //     dispatch({ type: 'ERROR', error: e });
  //   }
  // };
  //
  // useEffect(() => {
  //   fetchUsers();
  // }, []);
  //
  // (end)move to useAsync Hooks

  const onClick = (id) => {
    setUserId(id);
    clickUser(dispatch, { users, id});
    setReady(true);
  };

  const onLogin = () => {
    if (!ready) return false;
    if (!userId) return false;

    appDispatch({
      type: 'LOGIN',
      user: users.filter(user => user.id === userId)[0]
    });
    navigate(redirectPath.current);
  };

  const reset = () => {
    fetchData();
    setUserId(null);
    setReady(false);
  };

  if (loading) return <div><h1>LOADING..</h1></div>;
  if (error) return <div><h1>ERROR</h1></div>

  return (
    <div>
      <h1>계정 목록 <span onClick={reset}><MdRefresh></MdRefresh></span></h1>
      <ul>
        {users && users.map(user => (
          <User key={user.id} user={user} onClick={ () => { onClick(user.id)} }></User>
        ))}
      </ul>
      <LoginTemplateBlock ready={ready} onClick={ () => onLogin() }>로그인 <MdLogin></MdLogin></LoginTemplateBlock>
      { userId && <UserDetail userId={userId}></UserDetail> }
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

const UserDetail = ({userId}) => {

  // Library useAsync - (2023.06.08) loading 값이 안바뀜
  // const { data: user, error, loading, reload } = useAsync({
  //   promiseFn: getUser,
  //   userId: id,
  //   watch: id
  // });

  const [ state, repatch ] = useAsyncHook(getUser, [ userId ], false, { userId })
  const { loading, error, data: user } = state;

  if (loading) return <div><h1>LOADING..</h1></div>;
  if (error) return <div><h1>ERROR</h1></div>
  if (!user) return <button onClick={repatch}>불러오기</button>;

  return (
    <>
      <div key={userId} >
        <p>
          { Object.keys(user).map(key => (
            <p>{key} : {user[key].toString()}</p>
            // <p>{key} : {typeof user[key] !== 'object' ? user[key] : '...'}</p>
          ))}
        </p>
      </div>
    </>
  )
};

export default Login;