import styled from "styled-components";
import TodoItem from "./TodoItem";

////////////////
// 스타일 적용 //
////////////////

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

const TodoList = () => {
  return (
    <TodoListBlock>
      <TodoItem text="리액프 프로젝트 생성" done={true}></TodoItem>
      <TodoItem text="리액프 프로젝트 세팅" done={true}></TodoItem>
      <TodoItem text="블로그 개발" done={true}></TodoItem>
      <TodoItem text="할일 개발" done={false}></TodoItem>
      <TodoItem text="API 연동" done={false}></TodoItem>
      <TodoItem text="배포" done={false}></TodoItem>
    </TodoListBlock>
  );
};

export default TodoList;