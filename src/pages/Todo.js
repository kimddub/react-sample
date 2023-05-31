import {Navigate, useSearchParams} from "react-router-dom";
import styled from "styled-components";
import TodoHead from "../components/TodoHead";
import TodoList from "../components/TodoList";
import TodoCreate from "../components/TodoCreate";

////////////////
// 스타일 적용 //
////////////////

const TodoTemplateBlock = styled.div`
  width: 512px;
  height: 768px;

  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */

  margin-top: 96px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  
  text-align: left;
`;

const Todo = () => {

  ////////////////
  // 로그인 체크 //
  ////////////////

  // const location = useLocation();
  // location.search => 파싱 필요(querystring 패키지 설치)

  // const [searchParas, setSearchParams] = useSearchParams();
  // const isLoggedIn = searchParas.get('isLoggedIn');
  //
  // if (isLoggedIn === 'N') {
  //   // replace = true 일 경우, 뒤로가기 시 2페이지 전으로 이동
  //   return <Navigate to="/login" replace={true} />;
  // }

  return (
    <TodoTemplateBlock>
      <TodoHead />
      <TodoList />
      <TodoCreate />
    </TodoTemplateBlock>
  );
};

export default Todo;