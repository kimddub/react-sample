import {createContext, useContext, useReducer, useRef} from "react";

const initialApp = {
  user: {}
};

const appReducer = (state, action) => {
  switch(action.type) {
    case 'LOGIN':
      return { ...state, user: action.user };
    case 'LOGOUT':
      return { ...state, user: {} };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const AppStateContext = createContext();
const AppDispatchContext = createContext();
const AppPathContext = createContext();

export function AppProvider({ children }) {

  const redirectPath = useRef('/');
  const [state, dispatch] = useReducer(appReducer, initialApp);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        <AppPathContext.Provider value={redirectPath}>
          {children}
        </AppPathContext.Provider>
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

// Hook
export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('Cannot find AppProvider');
  }
  return context;
}

export const useAppDispatch = () => {
  const context = useContext(AppDispatchContext);
  if (!context) {
    throw new Error('Cannot find AppProvider');
  }
  return context;
}

export const useAppPath = () => {
  const context = useContext(AppPathContext);
  if (!context) {
    throw new Error('Cannot find AppProvider');
  }
  return context;
}