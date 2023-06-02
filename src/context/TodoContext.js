import {createContext, useContext, useReducer, useRef} from "react";

const initialTodos = [
  {
    id: 1,
    text: '리액프 프로젝트 생성',
    done: true
  },
  {
    id: 2,
    text: '리액프 프로젝트 세팅',
    done: true
  },
  {
    id: 3,
    text: '블로그 개발',
    done: true
  },
  {
    id: 4,
    text: '할일 개발',
    done: false
  },
  {
    id: 5,
    text: 'API 연동',
    done: false
  },
  {
    id: 6,
    text: '배포',
    done: false
  }
];

const todoReducer = (state, action) => {
  switch(action.type) {
    case 'CREATE':
      return state.concat(action.todo);
    case 'TOGGLE':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      )
    case 'REMOVE':
      return state.filter(todo => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(7);
  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

// Hook
export const useTodoState = () => {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export const useTodoDispatch = () => {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export const useTodoNextId = () => {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}