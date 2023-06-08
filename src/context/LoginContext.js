// import {createContext, useContext, useReducer, useRef} from "react";
//
// const initialLogin = {
//     loading: false,
//     data: null,
//     error: null
// };
//
// const loginReducer = (state, action) => {
//   switch(action.type) {
//     case 'LOADING':
//       return {...initialLogin, loading: true};
//     case 'SUCCESS':
//       return {...initialLogin, data: action.data};
//     case 'ERROR':
//       return {...initialLogin, error: action.error};
//     default:
//       throw new Error(`Unhandled action type: ${action.type}`);
//   }
// }
//
// const loginStateContext = createContext();
// const loginDispatchContext = createContext();
//
// export function LoginProvider({ children }) {
//   const [state, dispatch] = useReducer(loginReducer, initialLogin);
//   return (
//     <loginStateContext.Provider value={state}>
//       <loginDispatchContext.Provider value={dispatch}>
//           {children}
//       </loginDispatchContext.Provider>
//     </loginStateContext.Provider>
//   );
// }
//
// // Hook
// export const useloginState = () => {
//   const context = useContext(loginStateContext);
//   if (!context) {
//     throw new Error('Cannot find TodoProvider');
//   }
//   return context;
// }
//
// export const useLoginDispatch = () => {
//   const context = useContext(loginDispatchContext);
//   if (!context) {
//     throw new Error('Cannot find TodoProvider');
//   }
//   return context;
// }