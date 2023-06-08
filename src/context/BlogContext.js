import React, {createContext, useContext, useReducer} from "react";
import {produce} from "immer";

const initialState = {
  inputs: {
    title: '',
    content: ''
  },
  postList: [
    { id: 1, title: '판교 맛집 추천', content: '판교 맛집 추천 포스팅입니다.', hit: 10, isEditable: false, isSelected: false }
    , { id: 2, title: '판교 술집 추천', content: '판교 술집 추천 포스팅입니다.', hit: 5, isEditable: true, isSelected: false }
    , { id: 3, title: '판교 야경 추천', content: '판교 야경 추천 포스팅입니다.', hit: 0, isEditable: false, isSelected: false }
  ]
};

function blogReducer(state, action) {
  switch(action.type) {
    case 'CHANGE_INPUT':
      // TODO: useState의 함수형 업데이트 시 객체 불변성 유지가 복잡한 경우 Immer 라이브러리 사용(객체 불변성 고려를 최소화하기 위함. 성능 개선은 X)
      return produce(state, draft => {
        draft.inputs[action.name] = action.value;
      });
    // return {
    //   ...state,
    //   inputs: {
    //     ...state.inputs,
    //     [action.name]: action.value
    //   }
    // };
    case 'CREATE_POST':
      return produce(state, draft => {
        draft.inputs = initialState.inputs;
        draft.postList.push(action.post);
      });
    // return {
    //   ...state,
    //   inputs: initialState.inputs,
    //   postList: state.postList.concat(action.post)
    // };
    case 'CLICK_POST':
      return produce(state, draft => {
        draft.postList.forEach(post => post.id === action.postId ? post.isSelected = true : post.isSelected = false);
      });
    // return {
    //   ...state,
    //   postList: state.postList.map(post =>
    //     (post.id === action.postId ?
    //       {...post, isSelected: true } :
    //       {...post, isSelected: false }
    //     )
    //   )
    // };
    case 'REMOVE_POST':
      return produce(state, draft => {
        draft.postList.splice(draft.postList.findIndex(post => post.id === action.postId),1);
      });
    // return {
    //   ...state,
    //   postList: state.postList.filter(post => post.id !== action.postId)
    // };
    case 'INCREASE_HIT':
      return produce(state, draft => {
        draft.postList.find(post => post.id === action.postId).hit++;
      });
    // return {
    //   ...state,
    //   postList: state.postList.map(post => post.id === action.postId ? {...post, hit: ++post.hit} : post )
    // }
    default:
      return state;
  }
};

const BlogStateContext = createContext();
const BlogDispatchContext = createContext();
export function BlogProvider({ children }) {
  const [state, dispatch] = useReducer(blogReducer, initialState);
  return (
    <BlogStateContext.Provider value={state}>
      <BlogDispatchContext.Provider value={dispatch}>
          {children}
      </BlogDispatchContext.Provider>
    </BlogStateContext.Provider>
  );
}

// Hook
export const useBlogState = () => {
  const context = useContext(BlogStateContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export const useBlogDispatch = () => {
  const context = useContext(BlogDispatchContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}